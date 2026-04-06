from django.contrib import admin
from .models import MediaVideo, MediaPhoto, AcademicExcellence, GlobalMission, PressCoverage


class ContentSourceAdminMixin:
    class Media:
        js = ('admin/js/media_source_admin.js',)


@admin.register(MediaVideo)
class MediaVideoAdmin(ContentSourceAdminMixin, admin.ModelAdmin):
    list_display = ['title', 'content_source', 'category', 'display_size', 'featured', 'date', 'order']
    list_filter = ['content_source', 'category', 'display_size', 'featured', 'date']
    search_fields = ['title', 'description']
    list_editable = ['display_size', 'featured', 'order']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Content Source', {
            'fields': ('content_source',),
            'description': 'Choose whether this video uses a YouTube link or an uploaded file.'
        }),
        ('Video Details', {
            'fields': ('title', 'description', 'youtube_id', 'video_file', 'video_thumbnail'),
            'description': 'Only complete the fields for the selected source.'
        }),
        ('Display Settings', {
            'fields': ('display_size', 'width_percentage', 'height_pixels'),
            'description': 'Leave custom dimensions empty to use the selected display size preset'
        }),
        ('Classification', {
            'fields': ('category', 'date', 'featured', 'order')
        }),
    )


@admin.register(MediaPhoto)
class MediaPhotoAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'display_size', 'collage_position', 'featured', 'date', 'order']
    list_filter = ['category', 'display_size', 'collage_position', 'featured', 'date']
    search_fields = ['title', 'description']
    list_editable = ['display_size', 'collage_position', 'featured', 'order']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Photo Information', {
            'fields': ('title', 'description', 'image', 'thumbnail')
        }),
        ('Display Settings', {
            'fields': ('display_size', 'collage_position', 'width_pixels', 'height_pixels', 'border_radius'),
            'description': 'Leave custom dimensions empty to use the selected display size preset'
        }),
        ('Classification', {
            'fields': ('category', 'date', 'featured', 'order')
        }),
    )
    
    readonly_fields = ['thumbnail']


@admin.register(AcademicExcellence)
class AcademicExcellenceAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'highlight', 'featured', 'date', 'order']
    list_filter = ['category', 'featured', 'date']
    search_fields = ['title', 'description', 'highlight']
    list_editable = ['featured', 'order']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Achievement Information', {
            'fields': ('title', 'description', 'highlight', 'image')
        }),
        ('Details', {
            'fields': ('category', 'location', 'date')
        }),
        ('Display Settings', {
            'fields': ('featured', 'order')
        }),
    )


@admin.register(GlobalMission)
class GlobalMissionAdmin(admin.ModelAdmin):
    list_display = ['title', 'location', 'category', 'featured', 'date', 'order']
    list_filter = ['category', 'featured', 'date']
    search_fields = ['title', 'description', 'location']
    list_editable = ['featured', 'order']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Mission Information', {
            'fields': ('title', 'description', 'location', 'image')
        }),
        ('Impact Details', {
            'fields': ('beneficiaries', 'impact')
        }),
        ('Classification', {
            'fields': ('category', 'date', 'featured', 'order')
        }),
    )


@admin.register(PressCoverage)
class PressCoverageAdmin(ContentSourceAdminMixin, admin.ModelAdmin):
    list_display = ['title', 'outlet', 'media_type', 'content_source', 'featured', 'date', 'order']
    list_filter = ['media_type', 'content_source', 'featured', 'date']
    search_fields = ['title', 'description', 'outlet']
    list_editable = ['featured', 'order']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Content Source', {
            'fields': ('content_source',),
            'description': 'Choose whether this press item uses an image, YouTube link, or uploaded video file.'
        }),
        ('Article Information', {
            'fields': ('title', 'outlet', 'description', 'image', 'youtube_id', 'video_file', 'video_thumbnail'),
            'description': 'Only complete the media field that matches the selected content source.'
        }),
        ('Publication Details', {
            'fields': ('media_type', 'external_url', 'date')
        }),
        ('Display Settings', {
            'fields': ('featured', 'order')
        }),
    )
