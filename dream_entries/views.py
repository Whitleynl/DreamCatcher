from django.shortcuts import render
from rest_framework import generics
from .models import Dream
from .serializers import DreamSerializer
from django.db.models import Q

class DreamListCreateView(generics.ListCreateAPIView):
    serializer_class = DreamSerializer
    
    def get_queryset(self):
        return Dream.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class DreamSearchView(generics.ListAPIView):
    serializer_class = DreamSerializer
    def get_queryset(self):
        search = self.request.query_params.get('q', '')
        return Dream.objects.filter(Q(user=self.request.user) & (Q(title__icontains=search) | Q(description__icontains=search)))
    
class DreamDeleteView(generics.RetrieveDestroyAPIView):
    serializer_class = DreamSerializer
    lookup_field = 'id'
    
    def get_queryset(self):
        return Dream.objects.filter(user=self.request.user)

