from django.db import models
import requests

class Book(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    coverImage = models.URLField(default='https://example.com/default-image.jpg')
    price = models.CharField(max_length=50)
    genre = models.CharField(max_length=50, default='Unknown')   

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Подготовка данных
        data = {
            "id": str(self.id),  # Преобразуем ID в строку
            "title": self.title,
            "coverImage": self.coverImage,
            "description": self.description,
            "genre": self.genre,
            "price": self.price
        }

        # Проверяем, существует ли уже книга с таким ID в json-server
        try:
            check_response = requests.get(f"http://localhost:5002/books/{self.id}")
            if check_response.status_code == 200:
                # Книга уже есть — обновим
                response = requests.put(f"http://localhost:5002/books/{self.id}", json=data)
            else:
                # Книги нет — создадим
                response = requests.post("http://localhost:5002/books", json=data)

            if response.status_code not in (200, 201):
                print("Ошибка при отправке в json-server:", response.text)
        except requests.exceptions.RequestException as e:
            print("Не удалось подключиться к json-server:", e)

    def __str__(self):
        return self.title
