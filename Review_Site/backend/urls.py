from django.urls import path
from .views import IslandListView, IslandReviewListCreateView, ProtectedView, RegisterView


urlpatterns = [
    path('islands', IslandListView.as_view()),
    path('islands/<str:dream_code>/reviews/', IslandReviewListCreateView.as_view(), name='island-reviews'),
    path('register/', RegisterView.as_view(), name='register'),
    path('protected/', ProtectedView.as_view(), name='protected'),
]