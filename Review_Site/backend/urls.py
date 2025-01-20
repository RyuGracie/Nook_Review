from django.urls import path
from .views import IslandListView


urlpatterns = [
    path('island', IslandListView.as_view()),
]