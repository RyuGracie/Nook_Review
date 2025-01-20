from rest_framework.response import Response
from .models import Island
from .serializers import IslandSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import authentication, permissions

# Create your views here.
class IslandListView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        queryset = Island.objects.all()
        serializer = IslandSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)