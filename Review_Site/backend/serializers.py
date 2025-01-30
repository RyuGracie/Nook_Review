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
        
    def validate_image(self, value):
        """Validate and process the base64 image data."""
        if value:
            try:
                import base64
                from io import BytesIO
                from django.core.files.base import ContentFile
                from PIL import Image

                # Decode base64 string
                image_data = base64.b64decode(value)
                image_file = BytesIO(image_data)

                # Create a temporary image file
                image = Image.open(image_file)
                file_name = 'island_image.png'
                content = ContentFile(image_data, name=file_name)

                return content
            except Exception as e:
                raise serializers.ValidationError("Invalid image data.")

        return value

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
    
    # def create(self, validated_data):
    #     review = Review.objects.create(**validated_data)
    #     review.rating = round((review.aesth_rating + review.motif_rating + review.creat_rating) / 3)
    #     review.save()
    #     return review