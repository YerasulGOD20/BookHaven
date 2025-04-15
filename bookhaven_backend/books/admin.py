from django.contrib import admin
from .models import Book
import requests
from django.contrib import messages

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'coverImage', 'genre', 'price')
    actions = ['send_to_json_server']

    @admin.action(description='Отправить выбранные книги в json-server')
    def send_to_json_server(self, request, queryset):
        for book in queryset:
            data = {
                "id": str(book.id),
                "title": book.title,
                "coverImage": book.cover_image,
                "description": book.description,
                "genre": book.genre,
                "price": book.price
            }

            try:
                response = requests.get(f"http://localhost:5002/books/{book.id}")
                if response.status_code == 200:
                    r = requests.put(f"http://localhost:5002/books/{book.id}", json=data)
                else:
                    r = requests.post("http://localhost:5002/books", json=data)

                if r.status_code in (200, 201):
                    self.message_user(request, f"Книга '{book.title}' успешно отправлена.")
                else:
                    self.message_user(request, f"Ошибка при отправке книги '{book.title}': {r.text}", level=messages.ERROR)
            except requests.exceptions.RequestException as e:
                self.message_user(request, f"Ошибка соединения для '{book.title}': {e}", level=messages.ERROR)
