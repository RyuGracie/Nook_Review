from django.urls import path
from .views import IslandCreateView, IslandListView, IslandReviewListCreateView, RegisterView


urlpatterns = [
    path('islands', IslandListView.as_view()),
    path('islands/create/', IslandCreateView.as_view(), name='island-create'),
    path('islands/<str:dream_code>/reviews/', IslandReviewListCreateView.as_view(), name='island-reviews'),
    path('register/', RegisterView.as_view(), name='register'),
]