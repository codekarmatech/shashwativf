from django.contrib import admin
from .models import BlogPost, SuccessStory

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'featured', 'published', 'publish_date']
    list_filter = ['category', 'featured', 'published', 'author', 'publish_date']
    search_fields = ['title', 'excerpt', 'content']
    list_editable = ['featured', 'published']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'publish_date'
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'excerpt', 'content')
        }),
        ('Meta Information', {
            'fields': ('author', 'category', 'tags', 'read_time', 'featured_image')
        }),
        ('Publishing', {
            'fields': ('featured', 'published', 'publish_date')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).order_by('-publish_date')


@admin.register(SuccessStory)
class SuccessStoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'patient_initials', 'age', 'treatment', 'category', 'published', 'order']
    list_filter = ['category', 'published', 'year']
    search_fields = ['title', 'patient_initials', 'treatment', 'story']
    list_editable = ['published', 'order']
    
    fieldsets = (
        ('Patient Information', {
            'fields': ('patient_initials', 'age', 'treatment', 'duration', 'year')
        }),
        ('Story Content', {
            'fields': ('title', 'quote', 'story', 'outcome')
        }),
        ('Classification', {
            'fields': ('category', 'published', 'order')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).order_by('order', '-created_at')
