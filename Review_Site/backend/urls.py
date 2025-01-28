from django.urls import path
from .views import IslandListView, IslandReviewListCreateView


urlpatterns = [
    path('islands', IslandListView.as_view()),
    path('islands/<str:dream_code>/reviews/', IslandReviewListCreateView.as_view(), name='island-reviews'),
]