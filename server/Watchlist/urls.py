from django.urls import path
from .views import (
    add_movie,
    check_watchlist_by_id,
    get_watchlist,
)

app_name = 'watchlist'

urlpatterns = [
    path('', get_watchlist, name='get_movie'),
    path('add/', add_movie, name='add_movie'),
    path('<id>/', check_watchlist_by_id, name='get_movie'),
]