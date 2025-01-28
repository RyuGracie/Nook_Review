# Generated by Django 5.1.5 on 2025-01-23 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_island_started'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='comment',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='review',
            name='rating',
            field=models.IntegerField(editable=False),
        ),
    ]
