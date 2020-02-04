from django.db import models

# Create your models here.
class Watchlist(models.Model):
    user_id = models.CharField(max_length=100)
    movie_id = models.CharField(max_length=100)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_id