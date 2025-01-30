from rest_framework.response import Response
from .models import Island, Review
from .serializers import IslandSerializer, ReviewSerializer
from rest_framework.views import APIView
from rest_framework import status, authentication, permissions, mixins, generics
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from backend import serializers
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail


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

class IslandCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        serializer = IslandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class IslandReviewListView(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """
        Filters the reviews based on the island ID passed in the URL.
        """
        dream_code = self.kwargs.get('dream_code')  # Get dream_code from the URL
        return Review.objects.filter(id_island__dream_code=dream_code)
    # Handle GET requests for listing reviews
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class RequestPasswordReset(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data.get('email')
        print(email+" send to reset password")
        user = get_object_or_404(User, email=email)
        
        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        reset_token = str(refresh.access_token)

        # Send email (in real-world use a proper email service)
        send_mail(
            "Password Reset Request",
            f"Click the link to reset your password: http://localhost:5173/reset-password/confirm?token={reset_token}",
            "no-reply@example.com",
            [user.email],
        )

        return Response({"message": "Password reset link sent!"}, status=status.HTTP_200_OK)

class ResetPassword(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        if not token or not new_password:
            return Response({"error": "Token and new password required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Decode token
            from rest_framework_simplejwt.tokens import AccessToken
            decoded_token = AccessToken(token)
            user_id = decoded_token['user_id']
            user = User.objects.get(id=user_id)

            # Reset password
            user.password = make_password(new_password)
            user.save()

            return Response({"message": "Password reset successful!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
    
class IslandReviewCreateView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

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
