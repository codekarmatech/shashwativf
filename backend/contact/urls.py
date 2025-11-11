from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'submissions', views.ContactSubmissionViewSet)
router.register(r'newsletter', views.NewsletterSubscriptionViewSet)
router.register(r'clinic-info', views.ClinicInfoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
