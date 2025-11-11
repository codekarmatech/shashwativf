from rest_framework import viewsets
from .models import BlogPost, SuccessStory
from .serializers import BlogPostSerializer, SuccessStorySerializer

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'

class SuccessStoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SuccessStory.objects.filter(published=True)
    serializer_class = SuccessStorySerializer
