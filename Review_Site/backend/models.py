from django.db import models
from django.contrib.auth.models import User

class Island(models.Model):
    id_island = models.AutoField(primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    dream_code = models.CharField(max_length=100, blank=False, unique=True)
    name = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=False)
    image = models.ImageField(upload_to='images/', blank=False)
    started = models.DateField(blank=False)

    def __str__(self):
        return self.name

class Review(models.Model):
    id_review = models.AutoField(primary_key=True)
    id_island = models.ForeignKey(Island, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    aesth_rating = models.IntegerField(blank=False)
    motif_rating = models.IntegerField(blank=False)
    creat_rating = models.IntegerField(blank=False)
    comment = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)
    rating = models.IntegerField(editable=False, default=0)
    
    def __str__(self):
        return self.owner.username + ' - ' + self.id_island.name
    
    def save(self, *args, **kwargs):
        # Ensure the `rating` is calculated whenever the object is saved
        self.rating = round((self.aesth_rating + self.motif_rating + self.creat_rating) / 3)
        super().save(*args, **kwargs)
    
