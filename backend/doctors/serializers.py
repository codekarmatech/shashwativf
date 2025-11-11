from rest_framework import serializers
from .models import Doctor, TeamMember

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = [
            'id', 'name', 'designation', 'qualifications', 'experience',
            'specialties', 'highlights', 'bio', 'quote', 'is_leader',
            'category', 'photo', 'order', 'created_at', 'updated_at'
        ]

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = [
            'id', 'name', 'role', 'category', 'experience', 'description',
            'image', 'order', 'created_at'
        ]
