from django.contrib import admin
from .models import ContactSubmission, NewsletterSubscription, ClinicInfo

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'preferred_service', 'responded', 'submitted_at']
    list_filter = ['responded', 'submitted_at', 'preferred_service']
    search_fields = ['name', 'email', 'phone', 'message']
    list_editable = ['responded']
    date_hierarchy = 'submitted_at'
    readonly_fields = ['submitted_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'phone', 'email')
        }),
        ('Inquiry Details', {
            'fields': ('preferred_time', 'preferred_service', 'message')
        }),
        ('Admin Response', {
            'fields': ('responded', 'response_notes', 'submitted_at')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).order_by('-submitted_at')


@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['email', 'active', 'subscribed_at']
    list_filter = ['active', 'subscribed_at']
    search_fields = ['email']
    list_editable = ['active']
    date_hierarchy = 'subscribed_at'
    readonly_fields = ['subscribed_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).order_by('-subscribed_at')


@admin.register(ClinicInfo)
class ClinicInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'updated_at']
    readonly_fields = ['updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'tagline', 'description')
        }),
        ('Contact Information', {
            'fields': ('address_line1', 'address_line2', 'city', 'state', 'pincode', 'country')
        }),
        ('Phone Numbers', {
            'fields': ('front_desk_phone', 'appointments_phone', 'emergency_phone')
        }),
        ('Email Addresses', {
            'fields': ('general_email', 'appointments_email')
        }),
        ('Operating Hours', {
            'fields': ('weekday_hours', 'saturday_hours', 'sunday_hours')
        }),
        ('Metrics & Statistics', {
            'fields': ('towns_reached', 'lives_impacted', 'years_experience', 'success_rate')
        }),
        ('Social Media', {
            'fields': ('facebook_url', 'instagram_url', 'youtube_url', 'linkedin_url'),
            'classes': ('collapse',)
        }),
        ('System', {
            'fields': ('updated_at',),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        # Only allow one instance
        return not ClinicInfo.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Don't allow deletion of clinic info
        return False
