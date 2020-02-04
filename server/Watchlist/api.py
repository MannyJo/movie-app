from Watchlist.models import Watchlist
from rest_framework import viewsets, permissions
from .serializer import WatchlistSerializer

class WatchlistViewSet(viewsets.ModelViewSet):
    queryset = Watchlist.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WatchlistSerializer