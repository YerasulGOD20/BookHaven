# Generated by Django 5.2 on 2025-04-15 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_remove_book_author_remove_book_coverimage_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='cover_image',
        ),
        migrations.AddField(
            model_name='book',
            name='coverImage',
            field=models.URLField(default='https://example.com/default-image.jpg'),
        ),
        migrations.AddField(
            model_name='book',
            name='genre',
            field=models.CharField(default='Unknown', max_length=50),
        ),
        migrations.AlterField(
            model_name='book',
            name='description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='book',
            name='price',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='book',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]
