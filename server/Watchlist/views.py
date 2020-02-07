from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from .models import Watchlist
from .serializers import WatchlistSerializer

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_movie(request):
    user = request.user
    movie_id = request.data['movie_id']

    if request.method == 'POST':
        data = {}
        item = {}

        try:
            item = Watchlist.objects.get(user=user, movie_id=movie_id)
        except Watchlist.DoesNotExist:
            print('pass')

        if item:
            data = {
                'response': 'The movie\'s already added in the watchlist'
            }
            return Response(data=data)
            
        serializer = WatchlistSerializer(data={'user':user.id, 'movie_id':movie_id})

        if serializer.is_valid():
            added_movie = serializer.save()
            data['user'] = added_movie.user.username
            data['movie_id'] = added_movie.movie_id
        else:
            data = serializer.errors
            
        return Response(data=data)
        