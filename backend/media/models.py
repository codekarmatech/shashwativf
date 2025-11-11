from django.db import models
from PIL import Image
import os

class MediaVideo(models.Model):
    
    SIZE_CHOICES = [
        ('small', 'Small (300x200)'),
        ('medium', 'Medium (400x300)'),
        ('large', 'Large (600x400)'),
        ('extra_large', 'Extra Large (800x500)'),
        ('full_width', 'Full Width (100% width)'),
    ]
    
    title = models.CharField(max_length=300)
    description = models.TextField()
    youtube_id = models.CharField(
        max_length=50, 
        blank=True,
        null=True,
        help_text="YouTube video ID (e.g., dQw4w9WgXcQ) - Leave empty if uploading local video"
    )
    video_file = models.FileField(
        upload_to='media/videos/',
        blank=True,
        null=True,
        help_text="Upload local video file (MP4, WebM, etc.) - Use this OR YouTube ID, not both"
    )
    category = models.CharField(max_length=100, default='General')
    
    # Size controls for frontend display
    display_size = models.CharField(
        max_length=20, 
        choices=SIZE_CHOICES, 
        default='medium',
        help_text="Size of video player on frontend"
    )
    width_percentage = models.IntegerField(
        default=100, 
        help_text="Width as percentage (1-100) for custom sizing"
    )
    height_pixels = models.IntegerField(
        default=300, 
        help_text="Height in pixels for video player"
    )
    
    date = models.DateField()
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-date']
        verbose_name = 'Media Video'
        verbose_name_plural = 'Media Videos'
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if not self.youtube_id and not self.video_file:
            raise ValidationError('Either YouTube ID or video file must be provided.')
        if self.youtube_id and self.video_file:
            raise ValidationError('Provide either YouTube ID or video file, not both.')
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title


class MediaPhoto(models.Model):
    SIZE_CHOICES = [
        ('thumbnail', 'Thumbnail (150x150)'),
        ('small', 'Small (250x200)'),
        ('medium', 'Medium (400x300)'),
        ('large', 'Large (600x450)'),
        ('extra_large', 'Extra Large (800x600)'),
        ('full_width', 'Full Width (100% width)'),
        ('square_small', 'Square Small (200x200)'),
        ('square_medium', 'Square Medium (300x300)'),
        ('square_large', 'Square Large (500x500)'),
    ]
    
    COLLAGE_POSITIONS = [
        ('1x1', '1x1 (Single)'),
        ('2x1', '2x1 (Wide)'),
        ('1x2', '1x2 (Tall)'),
        ('2x2', '2x2 (Square Block)'),
        ('3x1', '3x1 (Extra Wide)'),
        ('1x3', '1x3 (Extra Tall)'),
    ]
    
    title = models.CharField(max_length=300)
    description = models.TextField()
    image = models.ImageField(
        upload_to='media/photos/', 
        help_text="Upload high-resolution photo"
    )
    thumbnail = models.ImageField(upload_to='media/thumbnails/', blank=True)
    category = models.CharField(max_length=100, default='General')
    
    # Size and layout controls for frontend display
    display_size = models.CharField(
        max_length=20, 
        choices=SIZE_CHOICES, 
        default='medium',
        help_text="Size of image on frontend"
    )
    collage_position = models.CharField(
        max_length=10, 
        choices=COLLAGE_POSITIONS, 
        default='1x1',
        help_text="Position in collage layout (grid size)"
    )
    width_pixels = models.IntegerField(
        default=400, 
        help_text="Custom width in pixels (overrides display_size if set)"
    )
    height_pixels = models.IntegerField(
        default=300, 
        help_text="Custom height in pixels (overrides display_size if set)"
    )
    border_radius = models.IntegerField(
        default=12, 
        help_text="Border radius in pixels for rounded corners"
    )
    
    date = models.DateField()
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-date']
        verbose_name = 'Media Photo'
        verbose_name_plural = 'Media Photos'
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
        # Auto-generate thumbnail
        if self.image and not self.thumbnail:
            img_path = self.image.path
            if os.path.exists(img_path):
                with Image.open(img_path) as img:
                    # Convert to RGB if necessary
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    
                    # Create thumbnail
                    img.thumbnail((300, 300), Image.Resampling.LANCZOS)
                    
                    # Save thumbnail
                    thumb_path = img_path.replace('/photos/', '/thumbnails/')
                    os.makedirs(os.path.dirname(thumb_path), exist_ok=True)
                    img.save(thumb_path, quality=85, optimize=True)
                    
                    # Update thumbnail field
                    self.thumbnail = thumb_path.replace(str(self.image.storage.location), '')


class AcademicExcellence(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    category = models.CharField(max_length=100, default='General')
    highlight = models.CharField(
        max_length=100, 
        blank=True, 
        help_text="Special highlight text (e.g., 'Gold Medal Winner')"
    )
    image = models.ImageField(upload_to='academic/', null=True, blank=True)
    location = models.CharField(max_length=200, blank=True)
    date = models.DateField()
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-date']
        verbose_name = 'Academic Excellence'
        verbose_name_plural = 'Academic Excellence'
    
    def __str__(self):
        return self.title


class GlobalMission(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    location = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default='General')
    beneficiaries = models.CharField(
        max_length=100, 
        blank=True,
        help_text="e.g., '200+ patients treated'"
    )
    impact = models.TextField(help_text="Describe the impact and outcomes")
    image = models.ImageField(upload_to='missions/', null=True, blank=True)
    date = models.DateField()
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-date']
        verbose_name = 'Global Mission'
        verbose_name_plural = 'Global Missions'
    
    def __str__(self):
        return self.title


class PressCoverage(models.Model):
    MEDIA_TYPES = [
        ('Newspaper', 'Newspaper'),
        ('Television', 'Television'),
        ('Online', 'Online'),
        ('Magazine', 'Magazine'),
    ]
    
    title = models.CharField(max_length=300)
    outlet = models.CharField(max_length=200, help_text="Publication name")
    description = models.TextField()
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPES)
    image = models.ImageField(upload_to='press/', null=True, blank=True)
    external_url = models.URLField(blank=True)
    date = models.DateField()
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-date']
        verbose_name = 'Press Coverage'
        verbose_name_plural = 'Press Coverage'
    
    def __str__(self):
        return self.title
