from django.urls import path
from .views import DreamListCreateView, DreamSearchView, DreamDeleteView

urlpatterns = [
    path('dreams/', DreamListCreateView.as_view(), name='dream-list-create'),
    path('dreams/search/', DreamSearchView.as_view(), name='dream-search'),
    path('dreams/<int:id>/', DreamDeleteView.as_view(), name='dream-delete'),
]