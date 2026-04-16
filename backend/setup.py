#!/usr/bin/env python3
"""
Setup script for Shashwat IVF Django Backend
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

def setup_backend():
    """Setup the Django backend with initial data"""
    
    # Set Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shashwativf_backend.settings')
    django.setup()
    
    from contact.models import ClinicInfo
    from doctors.models import Doctor
    from services.models import Service
    
    print("🏥 Setting up Shashwat IVF Backend...")
    
    # Create clinic info if it doesn't exist
    if not ClinicInfo.objects.exists():
        clinic_info = ClinicInfo.objects.create()
        print("✅ Created clinic information")
    
    # Create sample doctor if none exist
    if not Doctor.objects.exists():
        Doctor.objects.create(
            name="Dr. Shital Punjabi",
            designation="Consultant Gynecologist & IVF Specialist",
            qualifications="M.D., D.G.O. (Gold in D.G.O. + M.D.), FICOG, ART Specialist (USA)",
            experience="30+ years",
            specialties=["IVF & ART", "Gynecologic Endoscopy", "Cosmetic Gynecology"],
            highlights=["Gold in D.G.O. + M.D.", "FICOG Certified", "International Faculty"],
            bio="Dr. Shital Punjabi is a renowned fertility specialist with 30+ years of experience in gynecology and reproductive medicine.",
            quote="Precision in surgery and compassion in care - these are the foundations of successful fertility treatments.",
            is_leader=True,
            category="Doctor"
        )
        print("✅ Created sample doctor profile")
    
    # Create sample service if none exist
    if not Service.objects.exists():
        Service.objects.create(
            title="IVF Treatment",
            category="IVF & ART",
            short_description="Advanced In Vitro Fertilization treatment with high success rates",
            detailed_description="Our IVF program combines cutting-edge technology with personalized care to help couples achieve their dream of parenthood.",
            icon="FaFlask",
            featured=True,
            success_rate="65%",
            duration="2-3 weeks",
            ideal_age="25-35 years",
            process_steps=[
                {"title": "Initial Consultation", "description": "Comprehensive evaluation and treatment planning"},
                {"title": "Ovarian Stimulation", "description": "Controlled medication to stimulate egg production"},
                {"title": "Egg Retrieval", "description": "Minor procedure to collect mature eggs"},
                {"title": "Fertilization", "description": "Laboratory fertilization of eggs with sperm"},
                {"title": "Embryo Transfer", "description": "Transfer of healthy embryos to the uterus"}
            ],
            benefits=[
                "High success rates with advanced technology",
                "Personalized treatment protocols",
                "Experienced medical team",
                "Comprehensive support throughout the process"
            ]
        )
        print("✅ Created sample service")
    
    print("🎉 Backend setup completed successfully!")
    print("\n📋 Next Steps:")
    print("1. Create superuser: python manage.py createsuperuser")
    print("2. Access admin at: http://localhost:8000/admin/")
    print("3. API endpoints available at: http://localhost:8000/api/")
    print("4. Start frontend: cd ../frontend && npm start")

if __name__ == "__main__":
    setup_backend()
