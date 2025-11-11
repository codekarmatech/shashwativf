from rest_framework import serializers
from .models import ContactSubmission, NewsletterSubscription, ClinicInfo

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'phone', 'email', 'preferred_time', 'preferred_service', 'message']

class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['email']

class ClinicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicInfo
        fields = '__all__'
