from django.db import models
from django.utils.text import slugify

class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(max_length=100, default='General')
    short_description = models.TextField()
    detailed_description = models.TextField()
    
    # Icon name from react-icons (e.g., 'FaFlask', 'FaSnowflake')
    icon = models.CharField(max_length=50, default='FaHeart')
    
    # Service header image
    image = models.ImageField(
        upload_to='services/', 
        blank=True, 
        null=True,
        help_text="Header image for service detail page"
    )
    
    featured = models.BooleanField(default=False)
    badge = models.CharField(max_length=100, blank=True, help_text="Special badge text")
    
    # Treatment details
    success_rate = models.CharField(max_length=20, blank=True, help_text="e.g., '65%'")
    duration = models.CharField(max_length=50, blank=True, help_text="e.g., '2-3 weeks'")
    ideal_age = models.CharField(max_length=50, blank=True, help_text="e.g., '25-35 years'")
    
    # JSON fields for structured data
    process_steps = models.JSONField(
        default=list, 
        blank=True,
        help_text="List of process steps with title and description"
    )
    benefits = models.JSONField(
        default=list, 
        blank=True,
        help_text="List of benefits/advantages"
    )
    
    order = models.IntegerField(default=0)
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
