from django.db import models
from django.contrib.auth.models import User  

class Dream(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_logged = models.DateTimeField(auto_now_add=True)
    mood = models.CharField(max_length=50)
    lucidity_level = models.IntegerField()
    recurring = models.BooleanField()
    key_symbols = models.CharField(max_length=255, null=True, blank=True)
    user = models.ForeignKey(
        User,  
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title