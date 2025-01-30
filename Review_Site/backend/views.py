from rest_framework.response import Response
from .models import Island, Review
from .serializers import IslandSerializer, ReviewSerializer
from rest_framework.views import APIView
from rest_framework import status, authentication, permissions, mixins, generics
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from backend import serializers

# CHANGE ALL THAT SHIT TO JUST BASIC TOKEN AUTHORIZATION

# Generate JWT tokens for user
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class IslandListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        queryset = Island.objects.all()
        serializer = IslandSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class IslandReviewListCreateView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Filters the reviews based on the island ID passed in the URL.
        """
        dream_code = self.kwargs.get('dream_code')  # Get dream_code from the URL
        return Review.objects.filter(id_island__dream_code=dream_code)

    def perform_create(self, serializer):
        
        """
        Set the owner to the authenticated user and assign the island based on dream_code.
        """
        print(self.kwargs)
        dream_code = self.kwargs.get('dream_code')  # Get dream_code from the URL
        try:
            island = Island.objects.get(dream_code=dream_code)  # Find the Island
            serializer.save(owner=self.request.user, id_island=island)
        except Island.DoesNotExist:
            raise serializers.ValidationError({"detail": "Island with this dream code does not exist."})

    # Handle GET requests for listing reviews
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        return self.create(request, *args, **kwargs)
    
    # User Registration API
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

# Protected Route Example
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': f'Hello, {request.user.username}!'}, status=status.HTTP_200_OK)