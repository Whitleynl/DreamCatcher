from rest_framework import serializers
from .models import Dream

class DreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dream
        fields = ['id', 'title', 'description', 'date_logged', 'mood', 
                 'lucidity_level', 'recurring', 'key_symbols', 'user']
        read_only_fields = ['user']  