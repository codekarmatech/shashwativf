from django.contrib import admin
from .models import SiteConfiguration

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    """
    Admin configuration for Global Site Configuration.
    Ensures only one object is available and provides a clean interface for SEO and branding.
    """
    list_display = ('site_name', 'meta_title', 'updated_at')
    
    def has_add_permission(self, request):
        # Prevent more than one instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of the config
        return False

    fieldsets = (
        ('Site Identity', {
            'fields': ('site_name', 'favicon')
        }),
        ('SEO & Social Preview (Global)', {
            'fields': ('meta_title', 'meta_description', 'og_image'),
            'description': 'These variables are used for the website title and description shown in search results and when sharing the link on social media (WhatsApp, Facebook, Twitter).'
        }),
        ('Contact Info (Synced)', {
            'fields': ('contact_phone', 'contact_email')
        }),
    )
