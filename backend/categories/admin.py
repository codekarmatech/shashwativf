from django.contrib import admin
from .models import (
    ServiceCategory, MediaVideoCategory, MediaPhotoCategory,
    AcademicExcellenceCategory, GlobalMissionCategory, BlogCategory
)

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'active', 'created_at']
    list_editable = ['order', 'active']
    list_filter = ['active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['order', 'name']

@admin.register(MediaVideoCategory)
class MediaVideoCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'active', 'created_at']
    list_editable = ['order', 'active']
    list_filter = ['active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['order', 'name']

@admin.register(MediaPhotoCategory)
class MediaPhotoCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'active', 'created_at']
    list_editable = ['order', 'active']
    list_filter = ['active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['order', 'name']

@admin.register(AcademicExcellenceCategory)
class AcademicExcellenceCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'active', 'created_at']
    list_editable = ['order', 'active']
    list_filter = ['active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['order', 'name']

@admin.register(GlobalMissionCategory)
class GlobalMissionCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'active', 'created_at']
    list_editable = ['order', 'active']
    list_filter = ['active', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['order', 'name']

@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'color', 'order', 'active', 'created_at']
    list_editable = ['order', 'active']
    list_filter = ['active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order', 'name']
