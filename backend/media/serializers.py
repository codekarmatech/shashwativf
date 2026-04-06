from rest_framework import serializers
from .models import MediaVideo, MediaPhoto, AcademicExcellence, GlobalMission, PressCoverage

class MediaVideoSerializer(serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source='category', read_only=True)
    class Meta:
        model = MediaVideo
        fields = '__all__'

class MediaPhotoSerializer(serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source='category', read_only=True)
    class Meta:
        model = MediaPhoto
        fields = '__all__'

class AcademicExcellenceSerializer(serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source='category', read_only=True)
    class Meta:
        model = AcademicExcellence
        fields = '__all__'

class GlobalMissionSerializer(serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source='category', read_only=True)
    class Meta:
        model = GlobalMission
        fields = '__all__'

class PressCoverageSerializer(serializers.ModelSerializer):
    # PressCoverage doesn't have a category ForeignKey yet, it has outlet/media_type
    class Meta:
        model = PressCoverage
        fields = '__all__'
