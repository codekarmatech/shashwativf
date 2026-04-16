#!/usr/bin/env python3
"""
Populate Django backend with sample data based on Shashwat IVF website
Run with: python manage.py shell < populate_data.py
"""

from doctors.models import Doctor, TeamMember
from services.models import Service
from blog.models import BlogPost, SuccessStory
from media.models import MediaVideo, MediaPhoto, AcademicExcellence, GlobalMission, PressCoverage
from contact.models import ClinicInfo
from datetime import date, datetime
import json

def populate_clinic_info():
    """Populate clinic information"""
    clinic_info, created = ClinicInfo.objects.get_or_create(id=1)
    clinic_info.name = "Shashwat IVF & Women's Hospital"
    clinic_info.tagline = "NABH Accredited IVF Center in Ahmedabad"
    clinic_info.description = "Renowned expertise in infertility treatments with state-of-the-art facilities and comprehensive services. We offer personalized care with empowering guidance throughout your fertility journey."
    clinic_info.address_line1 = "2nd Floor, Nilkanth Palace"
    clinic_info.address_line2 = "Prahalad Nagar Road, Opp Seema Hall, Satellite"
    clinic_info.city = "Ahmedabad"
    clinic_info.state = "Gujarat"
    clinic_info.pincode = "380015"
    clinic_info.front_desk_phone = "+91 79269 31919"
    clinic_info.general_email = "admin@shashwativf.com"
    clinic_info.save()
    print("✅ Clinic information updated")

def populate_doctors():
    """Populate doctor profiles"""
    # Dr. Shital Punjabi
    dr_shital, created = Doctor.objects.get_or_create(
        name="Dr. Shital Punjabi",
        defaults={
            "designation": "Consultant Gynecologist & Surgeon",
            "qualifications": "M.D., D.G.O. (Gold in D.G.O. + M.D.), FICOG, ART Specialist (USA)",
            "experience": "30+ years",
            "specialties": ["IVF & ART", "Gynecologic Endoscopy", "Cosmetic Gynecology", "Fertility Treatments", "Egg Freezing"],
            "highlights": ["Gold in D.G.O. + M.D.", "FICOG Certified", "International Faculty", "Advanced Reproductive Technology Specialist"],
            "bio": "Dr. Shital Punjabi is a renowned fertility specialist with 30+ years of experience in gynecology and reproductive medicine. She has been instrumental in helping thousands of couples achieve their dream of parenthood through advanced fertility treatments and personalized care.",
            "quote": "Every individual deserves the opportunity to experience the joys of parenthood. We believe in personalized care and empowering guidance throughout your fertility journey.",
            "is_leader": True,
            "category": "Doctor",
            "order": 1
        }
    )
    
    # Dr. Rajesh Punjabi
    dr_rajesh, created = Doctor.objects.get_or_create(
        name="Dr. Rajesh Punjabi",
        defaults={
            "designation": "Consultant Gynecologist & Surgeon",
            "qualifications": "M.D., M.S., Advanced Laparoscopy Training",
            "experience": "30+ years",
            "specialties": ["Advanced Laparoscopy", "Gynecologic Surgery", "Infertility Surgery", "Endoscopy", "Minimally Invasive Surgery"],
            "highlights": ["Advanced Laparoscopy Expert", "International Training", "Surgical Excellence", "FOGSI Member", "25+ Years Experience"],
            "bio": "Dr. Rajesh Punjabi is an expert in advanced gynecologic surgery and laparoscopy with 30+ years of experience. He specializes in minimally invasive surgical techniques and has trained internationally in advanced reproductive surgery.",
            "quote": "Precision in surgery and compassion in care - these are the foundations of successful treatments.",
            "is_leader": True,
            "category": "Doctor",
            "order": 2
        }
    )
    print("✅ Doctor profiles created")

def populate_services():
    """Populate services based on website content"""
    services_data = [
        {
            "title": "IVF Treatment",
            "category": "IVF & ART",
            "short_description": "Advanced In Vitro Fertilization treatment with high success rates and personalized care",
            "detailed_description": "Our IVF program combines cutting-edge technology with personalized care to help couples achieve their dream of parenthood. We offer comprehensive fertility treatments with state-of-the-art facilities.",
            "icon": "FaFlask",
            "featured": True,
            "success_rate": "65%",
            "duration": "2-3 weeks",
            "ideal_age": "25-35 years",
            "process_steps": [
                {"title": "Initial Consultation", "description": "Comprehensive evaluation and treatment planning"},
                {"title": "Ovarian Stimulation", "description": "Controlled medication to stimulate egg production"},
                {"title": "Egg Retrieval", "description": "Minor procedure to collect mature eggs"},
                {"title": "Fertilization", "description": "Laboratory fertilization of eggs with sperm"},
                {"title": "Embryo Transfer", "description": "Transfer of healthy embryos to the uterus"}
            ],
            "benefits": [
                "High success rates with advanced technology",
                "Personalized treatment protocols",
                "Experienced medical team",
                "Comprehensive support throughout the process"
            ]
        },
        {
            "title": "Egg Freezing",
            "category": "Fertility Preservation",
            "short_description": "Preserve your fertility for the future with advanced egg freezing technology",
            "detailed_description": "Egg freezing service available – Preserve your fertility for the future. Our advanced vitrification technology ensures optimal egg preservation for when you're ready to start your family.",
            "icon": "FaSnowflake",
            "featured": True,
            "success_rate": "85%",
            "duration": "2-3 weeks",
            "ideal_age": "25-35 years",
            "badge": "Future-focused fertility preservation"
        },
        {
            "title": "Obstetrics & Gynecology",
            "category": "Gynecology",
            "short_description": "Comprehensive women's health services including obstetrics and gynecology",
            "detailed_description": "Explore the treatments, diagnostics & surgical procedures available in Obstetrics & Gynecology specialities with our experienced team.",
            "icon": "FaUserMd",
            "featured": False
        },
        {
            "title": "Cosmetic Gynecology",
            "category": "Gynecology",
            "short_description": "Various treatments and surgical procedures available in gynecological cosmetics",
            "detailed_description": "Various treatments and surgical procedures available in gynecological cosmetics to enhance your confidence and well-being.",
            "icon": "FaHeart",
            "featured": False
        }
    ]
    
    for service_data in services_data:
        service, created = Service.objects.get_or_create(
            title=service_data["title"],
            defaults=service_data
        )
        if created:
            print(f"✅ Created service: {service.title}")

def populate_success_stories():
    """Populate success stories"""
    stories_data = [
        {
            "title": "Blessed with immense joy at your clinic",
            "patient_initials": "M.C.",
            "age": 32,
            "treatment": "IVF Treatment",
            "duration": "6 months",
            "year": "2023",
            "quote": "Blessed with immense joy at your clinic. Thank you seems very small word for whatever you did for us but its big heartiest Thank you only which I can say to you.",
            "story": "After years of trying to conceive, we found hope at Shashwat IVF. The entire team was supportive throughout our journey.",
            "outcome": "Successful pregnancy and healthy baby",
            "category": "IVF Success",
            "published": True
        },
        {
            "title": "Perfect advice, motherly love, and superb treatment",
            "patient_initials": "H.S.",
            "age": 29,
            "treatment": "Fertility Treatment",
            "duration": "4 months",
            "year": "2023",
            "quote": "I got perfect advise, motherly love, and superb treatment. Thanks a lot for the miracle that changed my life",
            "story": "The care and attention I received was exceptional. Dr. Shital treated me like family and guided me through every step.",
            "outcome": "Successful conception",
            "category": "IVF Success",
            "published": True
        },
        {
            "title": "Heartfelt gratitude for our precious journey",
            "patient_initials": "J.K.",
            "age": 34,
            "treatment": "IVF with ICSI",
            "duration": "8 months",
            "year": "2023",
            "quote": "With immense pleasure, we would like to convey our heartfelt gratitude to both of you for your continuous cooperation, support and motivation through out our most precious journey towards parenthood.",
            "story": "Your dedication, enthusiasm, warmth and tireless efforts have always made us feel elated and gave us positivity. Your kind words and positive approach will always be cherished by us in the years to come.",
            "outcome": "Successful pregnancy",
            "category": "IVF Success",
            "published": True
        }
    ]
    
    for story_data in stories_data:
        story, created = SuccessStory.objects.get_or_create(
            patient_initials=story_data["patient_initials"],
            defaults=story_data
        )
        if created:
            print(f"✅ Created success story: {story.title}")

def populate_media():
    """Populate media content"""
    # Academic Excellence
    academic_data = [
        {
            "title": "NABH Accreditation Achievement",
            "description": "Shashwat IVF & Women's Hospital receives NABH accreditation for quality healthcare standards",
            "category": "Quality Certification",
            "highlight": "NABH Accredited",
            "date": date(2023, 8, 15),
            "featured": True
        },
        {
            "title": "FOGSI Certified Training Centre",
            "description": "Official recognition as FOGSI Certified Training Centre for Gynecologists",
            "category": "Institutional Recognition",
            "highlight": "Training Centre",
            "date": date(2023, 12, 1),
            "featured": True
        }
    ]
    
    for data in academic_data:
        academic, created = AcademicExcellence.objects.get_or_create(
            title=data["title"],
            defaults=data
        )
        if created:
            print(f"✅ Created academic achievement: {academic.title}")

# Run all population functions
if __name__ == "__main__":
    print("🏥 Populating Shashwat IVF backend with website data...")
    populate_clinic_info()
    populate_doctors()
    populate_services()
    populate_success_stories()
    populate_media()
    print("🎉 Backend populated successfully with website data!")
