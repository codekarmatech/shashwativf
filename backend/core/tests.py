from pathlib import Path
from tempfile import TemporaryDirectory

from django.test import RequestFactory, TestCase, override_settings

from core.models import SiteConfiguration
from core.views import serve_frontend_with_seo


class FrontendSeoViewTests(TestCase):
    def test_placeholders_are_replaced_from_site_configuration(self):
        with TemporaryDirectory() as temp_dir:
            temp_path = Path(temp_dir)
            backend_dir = temp_path / 'backend'
            frontend_build_dir = temp_path / 'frontend' / 'build'
            backend_dir.mkdir(parents=True, exist_ok=True)
            frontend_build_dir.mkdir(parents=True, exist_ok=True)
            (frontend_build_dir / 'index.html').write_text(
                """
                <html>
                  <head>
                    <title>__SEO_TITLE__</title>
                    <meta name="description" content="__SEO_DESCRIPTION__" />
                    <meta property="og:title" content="__OG_TITLE__" />
                    <meta property="og:description" content="__OG_DESCRIPTION__" />
                    <meta property="og:image" content="__OG_IMAGE__" />
                    <meta property="og:url" content="__OG_URL__" />
                  </head>
                </html>
                """,
                encoding='utf-8',
            )

            SiteConfiguration.objects.create(
                site_name="Shashwat IVF & Women's Hospital",
                meta_title='Custom Share Title',
                meta_description='Custom share description',
            )

            request = RequestFactory().get('/')
            request.META['HTTP_HOST'] = 'www.shashwativf.com'
            request.META['wsgi.url_scheme'] = 'https'

            with override_settings(BASE_DIR=backend_dir, ALLOWED_HOSTS=['www.shashwativf.com', 'testserver', 'localhost']):
                response = serve_frontend_with_seo(request)

            content = response.content.decode('utf-8')
            self.assertIn('Custom Share Title', content)
            self.assertIn('Custom share description', content)
            self.assertIn('https://www.shashwativf.com/', content)
            self.assertNotIn('__OG_TITLE__', content)
