from django.urls import path
from .views import DreamListCreateView, DreamSearchView, DreamDetailView

urlpatterns = [
    path('', DreamListCreateView.as_view(), name='dream-list-create'),
    path('search/', DreamSearchView.as_view(), name='dream-search'),  
    path('<int:id>/', DreamDetailView.as_view(), name='dream-detail'),
]