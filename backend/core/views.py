from pathlib import Path
from urllib.parse import quote

from django.conf import settings
from django.http import HttpResponse
from .models import SiteConfiguration


DEFAULT_OG_IMAGE_PATH = '/Shasheat IVF R-03.png'


def _get_frontend_index_path():
    frontend_root = Path(settings.BASE_DIR).parent / 'frontend'
    build_index = frontend_root / 'build' / 'index.html'
    public_index = frontend_root / 'public' / 'index.html'
    return build_index if build_index.exists() else public_index


def _build_default_og_image_url(request):
    return request.build_absolute_uri(quote(DEFAULT_OG_IMAGE_PATH, safe='/'))


def serve_frontend_with_seo(request, *args, **kwargs):
    """
    Serves the React frontend index.html with dynamically injected SEO meta tags.
    This allows WhatsApp/Facebook link previews to be editable via Django Admin.
    """
    index_path = _get_frontend_index_path()

    try:
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        return HttpResponse(
            "Frontend build not found. Please run 'npm run build' in the frontend directory.",
            status=500
        )

    config = SiteConfiguration.objects.first() or SiteConfiguration()

    title = config.meta_title or config.site_name
    description = config.meta_description
    image_url = (
        request.build_absolute_uri(config.og_image.url)
        if getattr(config, 'og_image', None)
        else _build_default_og_image_url(request)
    )
    canonical_url = request.build_absolute_uri(request.path or '/')

    replacements = {
        '__SEO_TITLE__': title,
        '__SEO_DESCRIPTION__': description,
        '__OG_TITLE__': title,
        '__OG_DESCRIPTION__': description,
        '__OG_IMAGE__': image_url,
        '__OG_URL__': canonical_url,
    }

    for placeholder, value in replacements.items():
        content = content.replace(placeholder, value)

    return HttpResponse(content)
