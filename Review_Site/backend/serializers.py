from rest_framework import serializers
from django.contrib.auth.models import User
from drf_extra_fields.fields import Base64ImageField
from .models import Island, Review

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
        
class IslandSerializer(serializers.ModelSerializer):
    owner = serializers.SlugRelatedField(
        slug_field='username',
        read_only=True
    )
    image = Base64ImageField(required=True, represent_in_base64=True)
    class Meta:
        model = Island
        fields = [ 'owner', 'dream_code', 'name', 'description', 'image']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id_island', 'owner', 'aesth_rating', 'motif_rating', 'creat_rating', 'rating', 'date']