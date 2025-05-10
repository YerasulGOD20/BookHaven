import json
from books.models import Book
from django.core.management.base import BaseCommand

import json
from books.models import Book
from django.core.management.base import BaseCommand
from decimal import Decimal

class Command(BaseCommand):
    help = 'Import books from a JSON file'

    def handle(self, *args, **kwargs):
        with open('db.json', encoding="utf-8") as f:
            data = json.load(f)

        for book_data in data['books']:
            book = Book(
                id=book_data['id'],
                title=book_data['title'],
                coverImage=book_data['coverImage'],
                description=book_data['description'],
                genre=book_data['genre'],
                price=book_data['price']
                )
        self.stdout.write(self.style.SUCCESS("Books imported successfully"))
