from django.db import models
from PIL import Image
import os

class Doctor(models.Model):
    CATEGORY_CHOICES = [
        ('Doctor', 'Doctor'),
        ('Consultant', 'Consultant'),
        ('Specialist', 'Specialist'),
    ]
    
    name = models.CharField(max_length=200)
    designation = models.CharField(max_length=200)
    qualifications = models.TextField()
    experience = models.CharField(max_length=50, help_text="e.g., '20+ years'")
    specialties = models.JSONField(default=list, help_text="List of specialties")
    highlights = models.JSONField(default=list, help_text="List of key highlights")
    bio = models.TextField()
    quote = models.TextField(blank=True)
    is_leader = models.BooleanField(default=False, help_text="Show in leaders section")
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='Doctor')
    
    # High-quality photo for clear display
    photo = models.ImageField(
        upload_to='doctors/', 
        null=True, 
        blank=True,
        help_text="Upload high-resolution photo (minimum 800x800px)"
    )
    
    order = models.IntegerField(default=0, help_text="Display order (lower numbers first)")
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Doctor'
        verbose_name_plural = 'Doctors'
    
    def __str__(self):
        return f"Dr. {self.name}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # Auto-resize images to ensure consistent quality
        if self.photo:
            img_path = self.photo.path
            if os.path.exists(img_path):
                with Image.open(img_path) as img:
                    # Convert to RGB if necessary
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    
                    # Resize if too large
                    if img.height > 800 or img.width > 800:
                        output_size = (800, 800)
                        img.thumbnail(output_size, Image.Resampling.LANCZOS)
                        img.save(img_path, quality=95, optimize=True)


class TeamMember(models.Model):
    CATEGORY_CHOICES = [
        ('Doctor', 'Doctor'),
        ('Nurse', 'Nurse'),
        ('Technician', 'Technician'),
        ('Administrative', 'Administrative'),
        ('Support Staff', 'Support Staff'),
    ]
    
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    experience = models.CharField(max_length=50, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to='team/', null=True, blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'
    
    def __str__(self):
        return f"{self.name} - {self.role}"
