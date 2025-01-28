from rest_framework.response import Response
from .models import Island, Review
from .serializers import IslandSerializer, ReviewSerializer
from rest_framework.views import APIView
from rest_framework import status, authentication, permissions, mixins, generics

# Create your views here.
class IslandListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        queryset = Island.objects.all()
        serializer = IslandSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ReviewView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, id_island):
        queryset = Review.objects.filter(id_island=id_island)
        serializer = ReviewSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class IslandReviewListCreateView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        """
        Filters the reviews based on the island ID passed in the URL.
        """
        island_id = self.kwargs.get('id_island')  # Get the island ID from the URL
        return Review.objects.filter(id_island=island_id)

    # Handle GET requests for listing reviews
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def perform_create(self, serializer):
        """
        Set the owner to the authenticated user and assign the island ID.
        """
        island_id = self.kwargs.get('id_island')  # Get the island ID from the URL
        serializer.save(owner=self.request.user, id_island_id=island_id)