from django.contrib import admin
from .models import Doctor, TeamMember

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['name', 'designation', 'is_leader', 'category', 'active', 'order']
    list_filter = ['is_leader', 'category', 'active']
    search_fields = ['name', 'designation', 'qualifications']
    list_editable = ['is_leader', 'active', 'order']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'designation', 'qualifications', 'experience', 'photo')
        }),
        ('Professional Details', {
            'fields': ('specialties', 'highlights', 'bio', 'quote')
        }),
        ('Settings', {
            'fields': ('is_leader', 'category', 'order', 'active')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).order_by('order', 'name')


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'category', 'active', 'order']
    list_filter = ['category', 'active']
    search_fields = ['name', 'role']
    list_editable = ['active', 'order']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'role', 'category', 'experience', 'image')
        }),
        ('Details', {
            'fields': ('description',)
        }),
        ('Settings', {
            'fields': ('order', 'active')
        }),
    )
