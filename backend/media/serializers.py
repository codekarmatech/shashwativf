from rest_framework import serializers
from .models import MediaVideo, MediaPhoto, AcademicExcellence, GlobalMission, PressCoverage

class MediaVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaVideo
        fields = '__all__'

class MediaPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaPhoto
        fields = '__all__'

class AcademicExcellenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicExcellence
        fields = '__all__'

class GlobalMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalMission
        fields = '__all__'

class PressCoverageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PressCoverage
        fields = '__all__'
