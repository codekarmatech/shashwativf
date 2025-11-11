from django.db import models

class ServiceCategory(models.Model):
    """Dynamic categories for services"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Service Category'
        verbose_name_plural = 'Service Categories'
    
    def __str__(self):
        return self.name

class MediaVideoCategory(models.Model):
    """Dynamic categories for media videos"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Media Video Category'
        verbose_name_plural = 'Media Video Categories'
    
    def __str__(self):
        return self.name

class MediaPhotoCategory(models.Model):
    """Dynamic categories for media photos"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Media Photo Category'
        verbose_name_plural = 'Media Photo Categories'
    
    def __str__(self):
        return self.name

class AcademicExcellenceCategory(models.Model):
    """Dynamic categories for academic excellence"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Academic Excellence Category'
        verbose_name_plural = 'Academic Excellence Categories'
    
    def __str__(self):
        return self.name

class GlobalMissionCategory(models.Model):
    """Dynamic categories for global missions"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Global Mission Category'
        verbose_name_plural = 'Global Mission Categories'
    
    def __str__(self):
        return self.name

class BlogCategory(models.Model):
    """Dynamic categories for blog posts"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    slug = models.SlugField(unique=True, blank=True)
    color = models.CharField(max_length=7, default='#3B82F6', help_text='Hex color code for category')
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Blog Category'
        verbose_name_plural = 'Blog Categories'
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
