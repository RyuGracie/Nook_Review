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
        fields = "__all__"
    

class ReviewSerializer(serializers.ModelSerializer):
    id_island = serializers.PrimaryKeyRelatedField(
        queryset=Island.objects.all(), required=False  # Make it not required
    )
    owner = serializers.SlugRelatedField(
        slug_field='username',
        read_only=True
    )
    class Meta:
        model = Review
        fields = "__all__"