from django.urls import path
from .views import IslandCreateView, IslandListView, IslandReviewCreateView, IslandReviewListView, RegisterView, RequestPasswordReset, ResetPassword


urlpatterns = [
    path('islands', IslandListView.as_view()),
    path('islands/create/', IslandCreateView.as_view(), name='island-create'),
    path('islands/<str:dream_code>/reviews/', IslandReviewListView.as_view(), name='island-reviews'),
    path('islands/<str:dream_code>/create/', IslandReviewCreateView.as_view(), name='island-review-create'),
    path('register/', RegisterView.as_view(), name='register'),
    path('password-reset/', RequestPasswordReset.as_view(), name='password-reset-request'),
    path('password-reset/confirm/', ResetPassword.as_view(), name='password-reset-confirm'),

]