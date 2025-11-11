from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'posts', views.BlogPostViewSet)
router.register(r'stories', views.SuccessStoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
