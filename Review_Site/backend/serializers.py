from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Island, Review

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
        
class IslandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Island
        fields = [ 'owner', 'dream_code', 'name', 'description', 'image']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id_island', 'owner', 'aesth_rating', 'motif_rating', 'creat_rating', 'rating', 'date']