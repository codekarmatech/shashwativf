# Shashwati IVF Website - Maintenance Guide

## Overview
This is a comprehensive maintenance guide for the Shashwati IVF website built with React (frontend) and Django (backend). This guide is designed for WordPress developers who need to maintain and update the website.

## Technology Stack
- **Frontend**: React 18 with Tailwind CSS
- **Backend**: Django 5.2 with Django REST Framework
- **Database**: PostgreSQL (production) / SQLite (development)
- **Styling**: Tailwind CSS with custom components
- **Icons**: React Icons (Lucide, Font Awesome)
- **Animations**: Framer Motion

## Project Structure
```
shashwativf/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API service functions
│   │   └── data/           # Static data files
├── backend/                 # Django application
│   ├── shashwativf_backend/ # Main Django project
│   ├── categories/         # Category management app
│   ├── services/           # Services management app
│   ├── blog/              # Blog and success stories app
│   ├── media/             # Media (photos/videos) app
│   ├── doctors/           # Doctor profiles app
│   └── contact/           # Contact and clinic info app
└── MAINTENANCE_GUIDE.md    # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- Git

### Development Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shashwativf
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py populate_categories  # Populate initial categories
   python manage.py runserver
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the applications**
   - Frontend: http://localhost:3000
   - Backend Admin: http://localhost:8000/admin
   - API: http://localhost:8000/api

## Content Management

### Admin Panel Access
The Django admin panel is the primary interface for content management:
- URL: http://localhost:8000/admin (or your domain/admin)
- Login with superuser credentials

### Content Types

#### 1. Services Management
**Location**: Admin → Services → Services
- **Title**: Service name
- **Category**: Select from predefined categories (editable in Categories app)
- **Short Description**: Brief overview for cards
- **Detailed Description**: Full service description
- **Icon**: React icon name (e.g., 'FaHeart', 'FaSnowflake')
- **Image**: Header image for service detail page
- **Success Rate, Duration, Ideal Age**: Treatment details
- **Process Steps**: JSON field for step-by-step process
- **Benefits**: JSON field for service advantages

#### 2. Blog Management
**Location**: Admin → Blog → Blog Posts
- **Title**: Article title
- **Slug**: URL-friendly version (auto-generated)
- **Category**: Select from blog categories
- **Excerpt**: Brief summary for previews
- **Content**: Full article content (supports HTML)
- **Author**: Default is 'Dr. Shital Punjabi'
- **Tags**: JSON array of tags
- **Featured Image**: Article header image
- **Published**: Toggle to show/hide article

#### 3. Success Stories
**Location**: Admin → Blog → Success Stories
- **Patient Initials**: e.g., 'A.P.'
- **Treatment**: Type of treatment received
- **Category**: Treatment category
- **Quote**: Patient testimonial
- **Story**: Detailed success story
- **Outcome**: Treatment result

#### 4. Media Management

##### Videos
**Location**: Admin → Media → Media Videos
- **YouTube ID**: For YouTube videos (e.g., 'dQw4w9WgXcQ')
- **Video File**: Upload local video files (MP4, WebM)
- **Category**: Video category (Patient Stories, Education, etc.)
- **Display Size**: How video appears on frontend
- **Width/Height**: Custom dimensions

##### Photos
**Location**: Admin → Media → Media Photos
- **Image**: Upload high-resolution photos
- **Category**: Photo category (Awards, Conferences, etc.)
- **Display Size**: Photo size on frontend
- **Collage Position**: Grid layout position
- **Border Radius**: Rounded corners setting

#### 5. Doctor Profiles
**Location**: Admin → Doctors → Doctors
- **Name**: Doctor's full name
- **Title**: Professional title
- **Specialization**: Medical specialization
- **Bio**: Professional biography
- **Photo**: Profile picture
- **Qualifications**: JSON array of degrees/certifications
- **Experience Years**: Years of practice
- **Languages**: Spoken languages

#### 6. Categories Management
**Location**: Admin → Categories
- **Service Categories**: For services and success stories
- **Blog Categories**: For blog posts
- **Media Categories**: For photos and videos
- **Academic Excellence Categories**: For achievements
- **Global Mission Categories**: For mission activities

Each category has:
- **Name**: Category display name
- **Description**: Category description
- **Order**: Display order (lower numbers first)
- **Active**: Toggle to enable/disable

#### 7. Contact Information
**Location**: Admin → Contact → Clinic Info
- **Contact Details**: Phone, email, address
- **Operating Hours**: Clinic timings
- **Social Media**: Links to social profiles
- **Metrics**: Success rates, patient counts
- **Emergency Contact**: After-hours contact

### Content Guidelines

#### Images
- **Services**: 1200x600px recommended
- **Blog**: 1200x630px for featured images
- **Doctors**: 400x400px square format
- **Media Photos**: High resolution (1920x1080px+)
- **Format**: JPG/PNG, optimized for web

#### Videos
- **Local Videos**: MP4 format, H.264 codec
- **YouTube**: Use video ID only (not full URL)
- **Duration**: Keep under 5 minutes for better engagement

#### Text Content
- **Titles**: Clear, descriptive, SEO-friendly
- **Descriptions**: Use proper grammar and medical terminology
- **HTML**: Basic HTML tags supported in content fields

## Common Maintenance Tasks

### 1. Adding New Services
1. Go to Admin → Services → Services
2. Click "Add Service"
3. Fill in all required fields
4. Select appropriate category
5. Add process steps and benefits in JSON format:
   ```json
   [
     {"title": "Step 1", "description": "Description here"},
     {"title": "Step 2", "description": "Description here"}
   ]
   ```
6. Save and publish

### 2. Managing Blog Content
1. **New Post**: Admin → Blog → Blog Posts → Add
2. **Categories**: Create new categories in Admin → Categories → Blog Categories
3. **SEO**: Ensure slug is SEO-friendly
4. **Images**: Upload featured image (1200x630px)
5. **Publishing**: Toggle "Published" to make live

### 3. Updating Doctor Information
1. Go to Admin → Doctors → Doctors
2. Select doctor to edit
3. Update information as needed
4. **Qualifications format**:
   ```json
   ["MBBS", "MD - Reproductive Medicine", "Fellowship in IVF"]
   ```

### 4. Media Management
1. **Photos**: Admin → Media → Media Photos
2. **Videos**: Admin → Media → Media Videos
3. **Categories**: Organize by type (Awards, Patient Stories, etc.)
4. **Display Settings**: Configure size and layout

### 5. Contact Information Updates
1. Admin → Contact → Clinic Info
2. Update contact details, hours, social media
3. **JSON Format for Hours**:
   ```json
   {
     "monday": "9:00 AM - 6:00 PM",
     "tuesday": "9:00 AM - 6:00 PM",
     "sunday": "Closed"
   }
   ```

## Troubleshooting

### Common Issues

#### 1. Images Not Displaying
- Check file permissions in media directory
- Ensure images are uploaded correctly
- Verify MEDIA_URL settings in Django

#### 2. Admin Panel Access Issues
- Verify superuser credentials
- Check Django server is running
- Clear browser cache

#### 3. Content Not Updating on Frontend
- Check if content is marked as "Published"
- Verify API endpoints are working
- Clear browser cache
- Restart Django server

#### 4. Category Errors
- Ensure categories exist before assigning to content
- Use Admin → Categories to manage all category types
- Check category relationships in database

### Database Maintenance

#### Backup Database
```bash
# For PostgreSQL
pg_dump database_name > backup.sql

# For SQLite (development)
cp db.sqlite3 backup_db.sqlite3
```

#### Reset Categories
```bash
python manage.py populate_categories
```

#### Create New Superuser
```bash
python manage.py createsuperuser
```

## Security Best Practices

### 1. Admin Access
- Use strong passwords for admin accounts
- Enable two-factor authentication if available
- Regularly update admin passwords
- Limit admin access to necessary personnel

### 2. File Uploads
- Validate file types and sizes
- Scan uploaded files for malware
- Use secure file storage locations

### 3. Database Security
- Regular backups
- Secure database credentials
- Use environment variables for sensitive settings

## Performance Optimization

### 1. Image Optimization
- Compress images before upload
- Use appropriate image formats (WebP when possible)
- Implement lazy loading for large galleries

### 2. Database Optimization
- Regular database maintenance
- Optimize queries for large datasets
- Use database indexing appropriately

### 3. Caching
- Enable Django caching for static content
- Use CDN for media files in production
- Implement browser caching headers

## Deployment

### Production Checklist
- [ ] Update environment variables
- [ ] Configure production database
- [ ] Set up media file storage (AWS S3, etc.)
- [ ] Configure domain and SSL
- [ ] Set DEBUG=False in Django settings
- [ ] Run collectstatic for Django admin
- [ ] Set up monitoring and logging

### Environment Variables
Create `.env` file in backend directory:
```
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=your-database-url
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
```

## Support and Maintenance

### Regular Maintenance Tasks
- **Weekly**: Check for broken links and images
- **Monthly**: Update content, review analytics
- **Quarterly**: Security updates, performance review
- **Annually**: Full backup, system updates

### Getting Help
1. Check this documentation first
2. Review Django admin interface
3. Check server logs for errors
4. Contact technical support if needed

### Useful Commands
```bash
# Start development servers
cd backend && python manage.py runserver
cd frontend && npm start

# Create database backup
python manage.py dumpdata > backup.json

# Load data from backup
python manage.py loaddata backup.json

# Check for issues
python manage.py check

# Create new migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

## Conclusion
This guide covers the essential aspects of maintaining the Shashwati IVF website. The Django admin interface provides a user-friendly way to manage all content without requiring technical knowledge. Regular maintenance and following best practices will ensure the website remains secure, performant, and up-to-date.

For technical issues beyond this guide's scope, consult the Django and React documentation or contact the development team.
