from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from .models import Watchlist
from .serializers import WatchlistSerializer
import json

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
            data['is_added'] = True
        else:
            data = serializer.errors
            data['is_added'] = False
            
        return Response(data=data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_watchlist_by_id(request, id):
    data = {}
    print('id :', id)
    if request.method == 'GET':
        try:
            user = request.user
            movie = Watchlist.objects.get(user=user, movie_id=id)
            data['is_exist'] = True
            print(movie)
        except Watchlist.DoesNotExist:
            data['is_exist'] = False

        return Response(data=data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_watchlist(request):
    data = {}
    user = request.user

    if request.method == 'GET':
        try:
            movies = Watchlist.objects.filter(user=user).values('movie_id')

            print(movies.count())
            print(list(movies))
            
            data['count'] = movies.count()
            data['movies'] = list(movies)
        except Watchlist.DoesNotExist:
            data['response'] = 'There is no movie in the list.'
            data['count'] = 0
        
        return Response(data=data)