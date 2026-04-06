from io import BytesIO
from pathlib import Path
import re
from urllib.parse import parse_qs, urlparse

from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
from django.db import models
from PIL import Image


YOUTUBE_ID_RE = re.compile(r"^[A-Za-z0-9_-]{11}$")


def extract_youtube_video_id(value):
    if not value:
        return None

    candidate = str(value).strip()
    if not candidate:
        return None

    parsed = urlparse(candidate)
    video_id = None

    if parsed.scheme and parsed.netloc:
        host = parsed.netloc.lower()
        path_parts = [part for part in parsed.path.split('/') if part]

        if host in {'youtu.be', 'www.youtu.be'}:
            video_id = path_parts[0] if path_parts else None
        elif host.endswith('youtube.com') or host.endswith('youtube-nocookie.com'):
            if parsed.path == '/watch':
                video_id = parse_qs(parsed.query).get('v', [None])[0]
            elif len(path_parts) >= 2 and path_parts[0] in {'embed', 'shorts', 'live', 'v'}:
                video_id = path_parts[1]
    else:
        video_id = candidate

    if video_id:
        video_id = video_id.split('&', 1)[0].split('?', 1)[0].strip()

    return video_id if video_id and YOUTUBE_ID_RE.fullmatch(video_id) else None


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
        max_length=255,
        blank=True,
        null=True,
        help_text="Paste a YouTube URL or video ID (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
    )
    video_file = models.FileField(
        upload_to='media/videos/',
        blank=True,
        null=True,
        help_text="Upload local video file (MP4, WebM, etc.) - Use this OR YouTube ID, not both"
    )
    category = models.ForeignKey(
        'categories.MediaVideoCategory',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='videos',
        help_text="Select a video category"
    )
    
    # Size controls for frontend display
    display_size = models.CharField(
        max_length=20, 
        choices=SIZE_CHOICES, 
        default='medium',
        help_text="Size of video player on frontend"
    )
    width_percentage = models.IntegerField(
        blank=True,
        null=True,
        help_text="Optional custom width percentage (1-100). Leave empty to use display size presets."
    )
    height_pixels = models.IntegerField(
        blank=True,
        null=True,
        help_text="Optional custom height in pixels. Leave empty to use display size presets."
    )
    
    date = models.DateField()
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-date']
        verbose_name = 'Media Video'
        verbose_name_plural = 'Media Videos'

    @property
    def youtube_video_id(self):
        return extract_youtube_video_id(self.youtube_id)

    @property
    def youtube_embed_url(self):
        return (
            f'https://www.youtube.com/embed/{self.youtube_video_id}'
            if self.youtube_video_id else None
        )

    @property
    def youtube_thumbnail_url(self):
        return (
            f'https://img.youtube.com/vi/{self.youtube_video_id}/hqdefault.jpg'
            if self.youtube_video_id else None
        )
    
    def clean(self):
        self.youtube_id = self.youtube_id.strip() if self.youtube_id else None
        if self.youtube_id:
            normalized_video_id = extract_youtube_video_id(self.youtube_id)
            if not normalized_video_id:
                raise ValidationError({'youtube_id': 'Enter a valid YouTube URL or 11-character video ID.'})
            self.youtube_id = normalized_video_id

        if not self.youtube_id and not self.video_file:
            raise ValidationError('Either a YouTube URL/ID or a video file must be provided.')
        if self.youtube_id and self.video_file:
            raise ValidationError('Provide either a YouTube URL/ID or a video file, not both.')

        has_custom_width = self.width_percentage is not None
        has_custom_height = self.height_pixels is not None
        if has_custom_width != has_custom_height:
            raise ValidationError('Set both width percentage and height pixels to use custom video dimensions.')
        if self.width_percentage is not None and not 1 <= self.width_percentage <= 100:
            raise ValidationError({'width_percentage': 'Width percentage must be between 1 and 100.'})
        if self.height_pixels is not None and self.height_pixels <= 0:
            raise ValidationError({'height_pixels': 'Height must be greater than 0.'})
    
    def save(self, *args, **kwargs):
        self.full_clean()
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
    category = models.ForeignKey(
        'categories.MediaPhotoCategory',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='photos',
        help_text="Select a photo category"
    )
    
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
        blank=True,
        null=True,
        help_text="Optional custom width in pixels. Leave empty to use display size presets."
    )
    height_pixels = models.IntegerField(
        blank=True,
        null=True,
        help_text="Optional custom height in pixels. Leave empty to use display size presets."
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

    def clean(self):
        has_custom_width = self.width_pixels is not None
        has_custom_height = self.height_pixels is not None
        if has_custom_width != has_custom_height:
            raise ValidationError('Set both width and height to use custom photo dimensions.')
        if self.width_pixels is not None and self.width_pixels <= 0:
            raise ValidationError({'width_pixels': 'Width must be greater than 0.'})
        if self.height_pixels is not None and self.height_pixels <= 0:
            raise ValidationError({'height_pixels': 'Height must be greater than 0.'})
        if self.border_radius < 0:
            raise ValidationError({'border_radius': 'Border radius cannot be negative.'})

    def _thumbnail_upload_path(self):
        image_name = Path(self.image.name).stem
        return f'media/thumbnails/{image_name}-thumb.jpg'

    def _build_thumbnail(self):
        self.image.open('rb')
        try:
            with Image.open(self.image) as img:
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')

                img.thumbnail((300, 300), Image.Resampling.LANCZOS)
                output = BytesIO()
                img.save(output, format='JPEG', quality=85, optimize=True)
                return ContentFile(output.getvalue())
        finally:
            self.image.close()
    
    def save(self, *args, **kwargs):
        previous_image_name = None
        if self.pk:
            previous = type(self).objects.filter(pk=self.pk).only('image').first()
            if previous and previous.image:
                previous_image_name = previous.image.name

        self.full_clean()
        super().save(*args, **kwargs)

        should_generate_thumbnail = bool(
            self.image and (not self.thumbnail or self.image.name != previous_image_name)
        )
        if should_generate_thumbnail:
            thumbnail_content = self._build_thumbnail()
            self.thumbnail.save(self._thumbnail_upload_path(), thumbnail_content, save=False)
            super().save(update_fields=['thumbnail'])


class AcademicExcellence(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    category = models.ForeignKey(
        'categories.AcademicExcellenceCategory',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='achievements',
        help_text="Select a category"
    )
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
    category = models.ForeignKey(
        'categories.GlobalMissionCategory',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='missions',
        help_text="Select a category"
    )
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
