from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(published=True)
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
