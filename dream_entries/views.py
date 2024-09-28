from django.shortcuts import render
from rest_framework import generics
from .models import Dream
from .serializers import DreamSerializer

class DreamListCreateView(generics.ListCreateAPIView):
    queryset = Dream.objects.all()
    serializer_class = DreamSerializer
    
class DreamSearchView(generics.ListAPIView):
    serializer_class = DreamSerializer
    def get_queryset(self):
        search = self.request.query_params.get('q', '')
        return Dream.objects.filter(title__icontains=search)

