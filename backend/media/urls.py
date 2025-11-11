from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'videos', views.MediaVideoViewSet)
router.register(r'photos', views.MediaPhotoViewSet)
router.register(r'academic', views.AcademicExcellenceViewSet)
router.register(r'missions', views.GlobalMissionViewSet)
router.register(r'press', views.PressCoverageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
