from django.core.management.base import BaseCommand
from categories.models import (
    ServiceCategory, MediaVideoCategory, MediaPhotoCategory,
    AcademicExcellenceCategory, GlobalMissionCategory, BlogCategory
)

class Command(BaseCommand):
    help = 'Populate initial category data'

    def handle(self, *args, **options):
        # Service Categories
        service_categories = [
            'IVF & ART', 'Fertility Preservation', 'Male Factor',
            'Gynecology', 'Diagnostics', 'Surgery'
        ]
        for i, name in enumerate(service_categories):
            ServiceCategory.objects.get_or_create(
                name=name,
                defaults={'order': i, 'description': f'{name} related services'}
            )

        # Media Video Categories
        video_categories = [
            'Patient Stories', 'Academic Excellence', 'Global Missions',
            'Facility Tour', 'Education'
        ]
        for i, name in enumerate(video_categories):
            MediaVideoCategory.objects.get_or_create(
                name=name,
                defaults={'order': i, 'description': f'{name} videos'}
            )

        # Media Photo Categories
        photo_categories = [
            'Awards & Recognition', 'International Faculty', 'Global Missions',
            'Certifications', 'Conferences'
        ]
        for i, name in enumerate(photo_categories):
            MediaPhotoCategory.objects.get_or_create(
                name=name,
                defaults={'order': i, 'description': f'{name} photos'}
            )

        # Academic Excellence Categories
        academic_categories = [
            'Awards & Recognition', 'Professional Certification', 'International Training',
            'Institutional Recognition', 'International Faculty', 'Quality Certification'
        ]
        for i, name in enumerate(academic_categories):
            AcademicExcellenceCategory.objects.get_or_create(
                name=name,
                defaults={'order': i, 'description': f'{name} achievements'}
            )

        # Global Mission Categories
        mission_categories = [
            'Medical Mission', 'International Faculty', 'Training Program',
            'Conference Leadership'
        ]
        for i, name in enumerate(mission_categories):
            GlobalMissionCategory.objects.get_or_create(
                name=name,
                defaults={'order': i, 'description': f'{name} activities'}
            )

        # Blog Categories
        blog_categories = [
            'Egg Freezing', 'IVF Basics', 'Male Factor', 'IVF Journey',
            "Women's Health", 'Support & Wellness', 'IVF Success'
        ]
        for i, name in enumerate(blog_categories):
            BlogCategory.objects.get_or_create(
                name=name,
                defaults={'order': i, 'description': f'{name} articles', 'color': '#3B82F6'}
            )

        self.stdout.write(
            self.style.SUCCESS('Successfully populated all categories')
        )
