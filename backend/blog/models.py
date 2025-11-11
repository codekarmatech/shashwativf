from django.db import models
from django.utils.text import slugify

class BlogPost(models.Model):
    title = models.CharField(max_length=300)
    slug = models.SlugField(unique=True, blank=True)
    excerpt = models.TextField(help_text="Brief summary of the article")
    content = models.TextField()
    author = models.CharField(max_length=200, default='Dr. Shital Punjabi')
    category = models.CharField(max_length=100, default='General')
    tags = models.JSONField(default=list, help_text="List of tags")
    
    featured = models.BooleanField(default=False)
    read_time = models.CharField(max_length=20, default='5 min read')
    featured_image = models.ImageField(upload_to='blog/', null=True, blank=True)
    
    published = models.BooleanField(default=False)
    publish_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-publish_date']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class SuccessStory(models.Model):
    title = models.CharField(max_length=300)
    patient_initials = models.CharField(max_length=10, help_text="e.g., 'A.P.'")
    age = models.IntegerField()
    treatment = models.CharField(max_length=200)
    duration = models.CharField(max_length=100, help_text="e.g., '6 months'")
    year = models.CharField(max_length=10)
    quote = models.TextField()
    story = models.TextField()
    outcome = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default='General')
    
    published = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = 'Success Story'
        verbose_name_plural = 'Success Stories'
    
    def __str__(self):
        return f"{self.patient_initials} - {self.title}"
