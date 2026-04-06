from rest_framework import serializers
from .models import MediaVideo, MediaPhoto, AcademicExcellence, GlobalMission, PressCoverage


class AbsoluteURLMixin:
    def build_absolute_url(self, field_file):
        if not field_file:
            return None

        url = getattr(field_file, 'url', field_file)
        if not url:
            return None

        if str(url).startswith(('http://', 'https://')):
            return str(url)

        request = self.context.get('request')
        return request.build_absolute_uri(url) if request else str(url)

    def get_category_label(self, obj):
        return obj.category.name if getattr(obj, 'category', None) else None


class MediaVideoSerializer(AbsoluteURLMixin, serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source='category', read_only=True)
    category_label = serializers.SerializerMethodField()
    youtube_video_id = serializers.SerializerMethodField()
    youtube_embed_url = serializers.SerializerMethodField()
    youtube_thumbnail_url = serializers.SerializerMethodField()
    video_file_url = serializers.SerializerMethodField()
    video_thumbnail_url = serializers.SerializerMethodField()
    has_custom_dimensions = serializers.SerializerMethodField()

    class Meta:
        model = MediaVideo
        fields = [
            'id', 'title', 'description', 'content_source', 'youtube_id', 'youtube_video_id',
            'youtube_embed_url', 'youtube_thumbnail_url', 'video_file',
            'video_file_url', 'video_thumbnail', 'video_thumbnail_url',
            'display_size', 'width_percentage', 'height_pixels',
            'has_custom_dimensions', 'date', 'featured', 'order', 'created_at',
            'category', 'category_name', 'category_label',
        ]

    def get_youtube_video_id(self, obj):
        return obj.youtube_video_id

    def get_youtube_embed_url(self, obj):
        return obj.youtube_embed_url

    def get_youtube_thumbnail_url(self, obj):
        return obj.youtube_thumbnail_url

    def get_video_file_url(self, obj):
        return self.build_absolute_url(obj.video_file)

    def get_video_thumbnail_url(self, obj):
        return self.build_absolute_url(obj.video_thumbnail)

    def get_has_custom_dimensions(self, obj):
        return obj.width_percentage is not None and obj.height_pixels is not None


class MediaPhotoSerializer(AbsoluteURLMixin, serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source='category', read_only=True)
    category_label = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    thumbnail_url = serializers.SerializerMethodField()
    has_custom_dimensions = serializers.SerializerMethodField()

    class Meta:
        model = MediaPhoto
        fields = [
            'id', 'title', 'description', 'image', 'image_url', 'thumbnail',
            'thumbnail_url', 'display_size', 'collage_position', 'width_pixels',
            'height_pixels', 'border_radius', 'has_custom_dimensions', 'date',
            'featured', 'order', 'created_at', 'category', 'category_name',
            'category_label',
        ]

    def get_image_url(self, obj):
        return self.build_absolute_url(obj.image)

    def get_thumbnail_url(self, obj):
        return self.build_absolute_url(obj.thumbnail)

    def get_has_custom_dimensions(self, obj):
        return obj.width_pixels is not None and obj.height_pixels is not None


class AcademicExcellenceSerializer(AbsoluteURLMixin, serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source='category', read_only=True)
    category_label = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = AcademicExcellence
        fields = [
            'id', 'title', 'description', 'category', 'category_name',
            'category_label', 'highlight', 'image', 'image_url', 'location',
            'date', 'featured', 'order', 'created_at',
        ]

    def get_image_url(self, obj):
        return self.build_absolute_url(obj.image)


class GlobalMissionSerializer(AbsoluteURLMixin, serializers.ModelSerializer):
    category_name = serializers.StringRelatedField(source='category', read_only=True)
    category_label = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GlobalMission
        fields = [
            'id', 'title', 'description', 'location', 'category',
            'category_name', 'category_label', 'beneficiaries', 'impact',
            'image', 'image_url', 'date', 'featured', 'order', 'created_at',
        ]

    def get_image_url(self, obj):
        return self.build_absolute_url(obj.image)


class PressCoverageSerializer(AbsoluteURLMixin, serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    youtube_video_id = serializers.SerializerMethodField()
    youtube_embed_url = serializers.SerializerMethodField()
    youtube_thumbnail_url = serializers.SerializerMethodField()
    video_file_url = serializers.SerializerMethodField()
    video_thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = PressCoverage
        fields = [
            'id', 'title', 'outlet', 'description', 'media_type', 'content_source',
            'image', 'image_url', 'youtube_id', 'youtube_video_id',
            'youtube_embed_url', 'youtube_thumbnail_url', 'video_file',
            'video_file_url', 'video_thumbnail', 'video_thumbnail_url',
            'external_url', 'date', 'featured', 'order', 'created_at'
        ]

    def get_image_url(self, obj):
        return self.build_absolute_url(obj.image)

    def get_youtube_video_id(self, obj):
        return obj.youtube_video_id

    def get_youtube_embed_url(self, obj):
        return obj.youtube_embed_url

    def get_youtube_thumbnail_url(self, obj):
        return obj.youtube_thumbnail_url

    def get_video_file_url(self, obj):
        return self.build_absolute_url(obj.video_file)

    def get_video_thumbnail_url(self, obj):
        return self.build_absolute_url(obj.video_thumbnail)
