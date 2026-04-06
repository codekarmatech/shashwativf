"""
URL configuration for shashwativf_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

from core.views import serve_frontend_with_seo

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/doctors/', include('doctors.urls')),
    path('api/services/', include('services.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/media/', include('media.urls')),
    path('api/contact/', include('contact.urls')),
    path('media', RedirectView.as_view(url='/mediacoverage', permanent=True)),
    
    # API and Admin are handled above.
    # The catch-all for React frontend with dynamic SEO
    # We move the catch-all to only trigger if it doesn't start with admin or api
    path('', serve_frontend_with_seo, name='frontend_root'),
    re_path(r'^(?!admin|api|static|media).*$', serve_frontend_with_seo, name='frontend_catch_all'),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
