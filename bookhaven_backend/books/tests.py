from django.test import TestCase, RequestFactory
from django.contrib.admin.sites import AdminSite
from unittest.mock import patch
from .models import Book
from .admin import BookAdmin
from django.contrib.messages.storage.fallback import FallbackStorage
class BookAdminTest(TestCase):
    def setUp(self):
        self.book = Book.objects.create(
            title="Test Book",
            description="Test Description",
            coverImage="https://example.com/image.jpg",
            price="10.99",
            genre="Fiction"
        )
        self.site = AdminSite()
        self.admin = BookAdmin(Book, self.site)
        self.request = RequestFactory().get('/')
        self.request.session = {}
        messages = FallbackStorage(self.request)
        setattr(self.request, '_messages', messages)

    def _inject_cover_image(self, book_queryset):
        books = list(book_queryset)
        for book in books:
            setattr(book, 'cover_image', book.coverImage)
        return books

    @patch('books.admin.requests.get')
    @patch('books.admin.requests.post')
    def test_send_to_json_server_creates_book(self, mock_post, mock_get):
        mock_get.return_value.status_code = 404
        mock_post.return_value.status_code = 201

        books = self._inject_cover_image(Book.objects.filter(id=self.book.id))
        self.admin.send_to_json_server(self.request, books)

        mock_get.assert_called_once()
        mock_post.assert_called_once()

    @patch('books.admin.requests.get')
    @patch('books.admin.requests.put')
    def test_send_to_json_server_updates_book(self, mock_put, mock_get):
        mock_get.return_value.status_code = 200
        mock_put.return_value.status_code = 200

        books = self._inject_cover_image(Book.objects.filter(id=self.book.id))
        self.admin.send_to_json_server(self.request, books)

        mock_get.assert_called_once()
        mock_put.assert_called_once()
