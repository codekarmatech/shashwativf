# Shashwat IVF & Women's Hospital

Complete web application for Shashwat IVF & Women's Hospital with React frontend and Django backend.

## 🏗️ Project Structure

```
shashwativf/
├── frontend/          # React.js frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Mock data (will be replaced by API)
│   │   ├── api/           # API service for backend integration
│   │   └── layout/        # Layout components
│   ├── public/
│   └── package.json
├── backend/           # Django REST API backend
│   ├── doctors/           # Doctor and team management
│   ├── services/          # Service management
│   ├── blog/              # Blog and success stories
│   ├── media/             # Media content management
│   ├── contact/           # Contact forms and clinic info
│   └── manage.py
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd shashwativf
```

### 2. Setup Backend (Django)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup database
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start backend server
python manage.py runserver 8000
```

### 3. Setup Frontend (React)
```bash
cd frontend
npm install
npm start
```

### 4. Access Applications
- **Frontend**: http://localhost:3000
- **Backend Admin**: http://localhost:8000/admin
- **API Documentation**: http://localhost:8000/api

## 🎯 Features

### Frontend Features
- **Modern Design**: Clean, professional healthcare website design
- **Responsive**: Mobile-first responsive design
- **SEO Optimized**: React Helmet for meta tags and SEO
- **Animations**: Framer Motion for smooth animations
- **Component Library**: Reusable UI components with Tailwind CSS

### Backend Features
- **Content Management**: Full Django admin for all content
- **REST API**: Complete REST API for frontend integration
- **Media Management**: Image upload with auto-resizing
- **Form Handling**: Contact forms and newsletter subscriptions
- **Data Models**: Comprehensive models for all website content

## 📊 Content Management

### Available Models
- **Doctors**: Doctor profiles with photos and qualifications
- **Team Members**: Staff categorized by role
- **Services**: Fertility services with detailed information
- **Blog Posts**: Articles and educational content
- **Success Stories**: Patient testimonials
- **Media Content**: Videos, photos, academic achievements
- **Contact Forms**: Form submissions and responses
- **Clinic Information**: Contact details and settings

### Admin Interface
Access the Django admin at `http://localhost:8000/admin` to manage:
- Doctor profiles and photos
- Service descriptions and pricing
- Blog posts and success stories
- Media gallery and press coverage
- Contact form submissions
- Newsletter subscriptions
- Clinic information and settings

## 🔧 API Endpoints

### Main Endpoints
- **Doctors**: `/api/doctors/`
- **Services**: `/api/services/`
- **Blog Posts**: `/api/blog/posts/`
- **Success Stories**: `/api/blog/stories/`
- **Media Videos**: `/api/media/videos/`
- **Media Photos**: `/api/media/photos/`
- **Academic Excellence**: `/api/media/academic/`
- **Global Missions**: `/api/media/missions/`
- **Press Coverage**: `/api/media/press/`
- **Contact Submissions**: `/api/contact/submissions/`
- **Newsletter**: `/api/contact/newsletter/`
- **Clinic Info**: `/api/contact/clinic-info/`

## 🎨 Design System

### Colors
- **Primary Teal**: #0891B2
- **Lavender**: #A855F7
- **Coral**: #F97316
- **Ink**: #0F172A
- **Background**: #FAFBFC

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Gradient cards with glassmorphism
- Animated buttons and pills
- Responsive navigation
- Modal dialogs
- Form components

## 🔐 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000/api
GENERATE_SOURCEMAP=false
```

### Backend (.env)
```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOW_ALL_ORIGINS=True
```

## 📱 Pages

### Frontend Pages
- **Home**: Hero section, services, doctors, testimonials
- **About**: Hospital information and values
- **Services**: Complete service listings with detail pages
- **Doctors**: Leadership team and full staff directory
- **Media**: Videos, photos, press coverage, academic achievements
- **Blog**: Articles and success stories
- **Contact**: Contact form with map and clinic information

### Key Features
- Dynamic routing for services and blog posts
- SEO-optimized meta tags
- Mobile-responsive design
- Contact form integration
- Newsletter subscription
- Social media integration

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy build folder to your hosting service
```

### Backend Deployment
```bash
cd backend
pip install -r requirements.txt
python manage.py collectstatic
python manage.py migrate
# Configure your production server (Gunicorn, Nginx, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Shashwat IVF & Women's Hospital.

## 🆘 Support

For technical support or questions:
- Email: tech@shashwativf.com
- Developer: www.codingbullz.com

---

**Built with ❤️ for Shashwat IVF & Women's Hospital**
