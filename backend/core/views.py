import os
from django.conf import settings
from django.http import HttpResponse
from .models import SiteConfiguration

def serve_frontend_with_seo(request, *args, **kwargs):
    """
    Serves the React frontend index.html with dynamically injected SEO meta tags.
    This allows WhatsApp/Facebook link previews to be editable via Django Admin.
    """
    # 1. Path to the React build's index.html
    # In production, this is usually in the build folder. 
    # In local dev, we might need to point to the public folder if build doesn't exist.
    frontend_build_dir = os.path.join(settings.BASE_DIR, '..', 'frontend', 'build')
    index_path = os.path.join(frontend_build_dir, 'index.html')

    # Fallback for local development if build folder isn't generated
    if not os.path.exists(index_path):
        index_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'public', 'index.html')

    try:
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        return HttpResponse(
            "Frontend build not found. Please run 'npm run build' in the frontend directory.",
            status=500
        )

    # 2. Fetch the Site Configuration
    config = SiteConfiguration.objects.first()
    
    if config:
        # 3. Dynamic Values
        title = config.meta_title or config.site_name
        description = config.meta_description
        
        # Build absolute URL for the image
        if config.og_image:
            image_url = request.build_absolute_uri(config.og_image.url)
        else:
            # Fallback to a default if no image is uploaded
            image_url = request.build_absolute_uri(settings.STATIC_URL + 'default_og.png')

        # 4. Perform Injections (Using placeholders we'll add to index.html)
        content = content.replace('__OG_TITLE__', title)
        content = content.replace('__OG_DESCRIPTION__', description)
        content = content.replace('__OG_IMAGE__', image_url)
        
        # Also replace standard <title> and meta description
        content = content.replace('<title>Shashwat IVF & Women\'s Hospital | Premier Fertility Care</title>', f'<title>{title}</title>')
        
        # Replace the description meta tag
        # Note: This is a bit fragile if the tag changes, but efficient.
        # A more robust regex could be used if preferred.
        default_desc = "Discover premier fertility care at Shashwat IVF"
        if default_desc in content:
            content = content.replace(default_desc, description)

    return HttpResponse(content)
