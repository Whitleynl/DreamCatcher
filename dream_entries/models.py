from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    password_hash = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.username
    
class Dream(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_logged = models.DateTimeField(auto_now_add=True)
    mood = models.CharField(max_length=50)
    lucidity_level = models.IntegerField()
    recurring = models.BooleanField()
    key_symbols = models.CharField(max_length=255, null=True, blank=True)    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    
    def __str__(self):
        return self.title