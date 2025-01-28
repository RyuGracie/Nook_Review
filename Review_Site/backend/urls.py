from django.urls import path
from .views import IslandListView, IslandReviewListCreateView


urlpatterns = [
    path('islands', IslandListView.as_view()),
    path('islands/<int:id_island>/reviews/', IslandReviewListCreateView.as_view(), name='island-reviews'),
]