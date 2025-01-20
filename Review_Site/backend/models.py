from django.db import models
from django.contrib.auth.models import User
    
class Island(models.Model):
    id_island = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    dream_code = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.name

class Review(models.Model):
    id_review = models.AutoField(primary_key=True)
    id_island = models.ForeignKey(Island, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    aesth_rating = models.IntegerField()
    motif_rating = models.IntegerField()
    creat_rating = models.IntegerField()
    rating = models.FloatField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
    
