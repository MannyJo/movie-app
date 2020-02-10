from django.urls import path
from .views import (
    add_movie,
    check_watchlist_by_id,
)

app_name = 'watchlist'

urlpatterns = [
    path('add/', add_movie, name='add_movie'),
    path('<id>/', check_watchlist_by_id, name='get_movie'),
    #path('/', , name='get_movie'),
]