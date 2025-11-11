from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Doctor, TeamMember
from .serializers import DoctorSerializer, TeamMemberSerializer

class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Doctor.objects.filter(active=True)
    serializer_class = DoctorSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_leader']
    search_fields = ['name', 'designation', 'specialties']
    ordering_fields = ['order', 'name']
    ordering = ['order', 'name']
    
    @action(detail=False, methods=['get'])
    def leaders(self, request):
        """Get only doctors who are leaders"""
        leaders = self.queryset.filter(is_leader=True)
        serializer = self.get_serializer(leaders, many=True)
        return Response(serializer.data)


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.filter(active=True)
    serializer_class = TeamMemberSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'role']
    ordering_fields = ['order', 'name']
    ordering = ['order', 'name']
