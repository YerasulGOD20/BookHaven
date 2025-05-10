from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .models import User, Book, Checkout
from .serializers import UserSerializer, BookSerializer, CheckoutSerializer

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Hello, JWT-authenticated user!"})
    

    
