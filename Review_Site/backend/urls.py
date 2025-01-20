from django.urls import path
from .views import IslandListView


urlpatterns = [
    path('islands', IslandListView.as_view()),
]