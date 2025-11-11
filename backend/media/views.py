from rest_framework import viewsets
from .models import MediaVideo, MediaPhoto, AcademicExcellence, GlobalMission, PressCoverage
from .serializers import (
    MediaVideoSerializer, MediaPhotoSerializer, AcademicExcellenceSerializer,
    GlobalMissionSerializer, PressCoverageSerializer
)

class MediaVideoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MediaVideo.objects.all()
    serializer_class = MediaVideoSerializer

class MediaPhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MediaPhoto.objects.all()
    serializer_class = MediaPhotoSerializer

class AcademicExcellenceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AcademicExcellence.objects.all()
    serializer_class = AcademicExcellenceSerializer

class GlobalMissionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GlobalMission.objects.all()
    serializer_class = GlobalMissionSerializer

class PressCoverageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PressCoverage.objects.all()
    serializer_class = PressCoverageSerializer
