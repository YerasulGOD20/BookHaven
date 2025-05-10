# bookhaven_backend/users/views.py
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer, 
    RegisterSerializer, 
    CustomTokenObtainPairSerializer, 
    ChangePasswordSerializer
)
import requests
import json

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """Представление для регистрации новых пользователей"""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Создаем JWT токены для нового пользователя
        refresh = RefreshToken.for_user(user)
        
        # Пытаемся создать пользователя также в json-server
        try:
            json_server_data = {
                "id": str(user.id),
                "name": user.name,
                "email": user.email,
                "password": request.data.get('password')  # В реальном проекте не храните пароли в открытом виде!
            }
            response = requests.post("http://localhost:5002/users", json=json_server_data)
            if not response.ok:
                print("Ошибка при создании пользователя в json-server:", response.text)
        except Exception as e:
            print("Ошибка при обращении к json-server:", str(e))
        
        return Response({
            "user": UserSerializer(user).data,
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    """Кастомное представление для получения JWT токенов"""
    serializer_class = CustomTokenObtainPairSerializer


class UserDetailView(generics.RetrieveUpdateAPIView):
    """Представление для получения и обновления данных пользователя"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    """API метод для смены пароля"""
    serializer = ChangePasswordSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        
        # Проверяем старый пароль
        if not user.check_password(serializer.data.get('old_password')):
            return Response({"old_password": "Неверный пароль"}, status=status.HTTP_400_BAD_REQUEST)
            
        # Устанавливаем новый пароль
        user.set_password(serializer.data.get('new_password'))
        user.save()
        
        # Обновляем пароль также в json-server
        try:
            # Проверяем существование пользователя
            check_response = requests.get(f"http://localhost:5002/users/{user.id}")
            if check_response.ok:
                json_data = check_response.json()
                json_data['password'] = serializer.data.get('new_password')  # Обновляем пароль
                response = requests.put(f"http://localhost:5002/users/{user.id}", json=json_data)
                if not response.ok:
                    print("Ошибка при обновлении пароля в json-server:", response.text)
        except Exception as e:
            print("Ошибка при обращении к json-server:", str(e))
        
        return Response({"detail": "Пароль успешно изменен"}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    """API метод для выхода пользователя из системы (инвалидация токена)"""
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()  # Блокируем использование токена
        return Response({"detail": "Выход выполнен успешно"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"detail": f"Ошибка при выходе: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)