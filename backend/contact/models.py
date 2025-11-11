from django.db import models

class ContactSubmission(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    preferred_time = models.CharField(max_length=50, blank=True)
    preferred_service = models.CharField(max_length=200, blank=True)
    message = models.TextField(blank=True)
    
    # Admin fields
    submitted_at = models.DateTimeField(auto_now_add=True)
    responded = models.BooleanField(default=False)
    response_notes = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-submitted_at']
        verbose_name = 'Contact Submission'
        verbose_name_plural = 'Contact Submissions'
    
    def __str__(self):
        return f"{self.name} - {self.submitted_at.strftime('%Y-%m-%d')}"


class NewsletterSubscription(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-subscribed_at']
        verbose_name = 'Newsletter Subscription'
        verbose_name_plural = 'Newsletter Subscriptions'
    
    def __str__(self):
        return self.email


class ClinicInfo(models.Model):
    """Single instance model for clinic information"""
    
    # Basic Info
    name = models.CharField(max_length=200, default="Shashwat IVF & Women's Hospital")
    tagline = models.CharField(max_length=300, default="NABH-accredited IVF & Women's Hospital · Ahmedabad")
    description = models.TextField(default="Comprehensive fertility and women's health services under one roof with ethical, transparent care")
    
    # Contact Information
    address_line1 = models.CharField(max_length=200, default="2nd Floor, Nilkanth Palace")
    address_line2 = models.CharField(max_length=200, default="Prahalad Nagar Road, Opp Seema Hall, Satellite")
    city = models.CharField(max_length=100, default="Ahmedabad")
    state = models.CharField(max_length=100, default="Gujarat")
    pincode = models.CharField(max_length=10, default="380015")
    country = models.CharField(max_length=100, default="India")
    
    # Phone Numbers
    front_desk_phone = models.CharField(max_length=20, default="+91 79269 31919")
    appointments_phone = models.CharField(max_length=20, default="+91 79269 31919")
    emergency_phone = models.CharField(max_length=20, default="+91 79269 31919")
    
    # Email
    general_email = models.EmailField(default="admin@shashwativf.com")
    appointments_email = models.EmailField(default="admin@shashwativf.com")
    
    # Hours
    weekday_hours = models.CharField(max_length=50, default="9:00 AM - 7:00 PM")
    saturday_hours = models.CharField(max_length=50, default="9:00 AM - 5:00 PM")
    sunday_hours = models.CharField(max_length=50, default="10:00 AM - 2:00 PM (Emergency only)")
    
    # Metrics
    towns_reached = models.CharField(max_length=10, default="91+")
    lives_impacted = models.CharField(max_length=20, default="20,000+")
    years_experience = models.CharField(max_length=10, default="20+")
    success_rate = models.CharField(max_length=10, default="65%")
    
    # Social Media
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Clinic Information'
        verbose_name_plural = 'Clinic Information'
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and ClinicInfo.objects.exists():
            raise ValueError('Only one ClinicInfo instance is allowed')
        super().save(*args, **kwargs)
