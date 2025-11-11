from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create router for doctors (at root level)
doctor_router = DefaultRouter()
doctor_router.register(r'', views.DoctorViewSet, basename='doctor')

# Create router for team members (at team/ level)
team_router = DefaultRouter()
team_router.register(r'', views.TeamMemberViewSet, basename='team')

urlpatterns = [
    path('team/', include(team_router.urls)),  # Team must come first to avoid conflicts
    path('', include(doctor_router.urls)),
]
