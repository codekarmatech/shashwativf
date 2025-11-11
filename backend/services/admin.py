from django.contrib import admin
from .models import Service

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'featured', 'published', 'order']
    list_filter = ['category', 'featured', 'published']
    search_fields = ['title', 'short_description']
    list_editable = ['featured', 'published', 'order']
    prepopulated_fields = {'slug': ('title',)}
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'category', 'short_description', 'detailed_description')
        }),
        ('Display Settings', {
            'fields': ('icon', 'image', 'featured', 'badge')
        }),
        ('Treatment Details', {
            'fields': ('success_rate', 'duration', 'ideal_age')
        }),
        ('Structured Data', {
            'fields': ('process_steps', 'benefits'),
            'classes': ('collapse',)
        }),
        ('Publishing', {
            'fields': ('published', 'order')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).order_by('order', 'title')
