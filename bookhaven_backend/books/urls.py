from django.urls import path
from .views import BookList, BookDetail, BookSearch

urlpatterns = [
    path('', BookList.as_view(), name='book-list'),
    path('<int:pk>/', BookDetail.as_view(), name='book-detail'),
    path('search/', BookSearch.as_view(), name='book-search'),
]