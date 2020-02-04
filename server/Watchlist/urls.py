from rest_framework import routers
from .api import WatchlistViewSet

router = routers.DefaultRouter()
router.register('api/watchlist', WatchlistViewSet, 'watchlist')

urlpatterns = router.urls