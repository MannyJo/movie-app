from django.urls import path
from .views import (
    add_movie,
)

app_name = 'watchlist'

urlpatterns = [
    path('add/', add_movie, name='add_movie'),
]