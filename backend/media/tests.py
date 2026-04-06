from io import BytesIO
import tempfile

from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from rest_framework.test import APIRequestFactory
from PIL import Image

from categories.models import MediaVideoCategory
from .models import MediaVideo, PressCoverage, extract_youtube_video_id
from .serializers import MediaVideoSerializer, PressCoverageSerializer


def build_test_image(name='test.jpg'):
    output = BytesIO()
    Image.new('RGB', (10, 10), color='red').save(output, format='JPEG')
    return SimpleUploadedFile(name, output.getvalue(), content_type='image/jpeg')


class YouTubeExtractionTests(TestCase):
    def test_extract_youtube_video_id_handles_supported_formats(self):
        self.assertEqual(extract_youtube_video_id('dQw4w9WgXcQ'), 'dQw4w9WgXcQ')
        self.assertEqual(
            extract_youtube_video_id('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
            'dQw4w9WgXcQ',
        )
        self.assertEqual(
            extract_youtube_video_id('https://youtu.be/dQw4w9WgXcQ?t=5'),
            'dQw4w9WgXcQ',
        )
        self.assertEqual(
            extract_youtube_video_id('https://www.youtube.com/embed/dQw4w9WgXcQ'),
            'dQw4w9WgXcQ',
        )

    def test_extract_youtube_video_id_rejects_invalid_values(self):
        self.assertIsNone(extract_youtube_video_id('https://example.com/watch?v=dQw4w9WgXcQ'))
        self.assertIsNone(extract_youtube_video_id('not-a-youtube-id'))


class TemporaryMediaRootTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls._temp_media_dir = tempfile.TemporaryDirectory()
        cls._override = override_settings(MEDIA_ROOT=cls._temp_media_dir.name)
        cls._override.enable()
        super().setUpClass()

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        cls._override.disable()
        cls._temp_media_dir.cleanup()


class MediaVideoModelTests(TemporaryMediaRootTestCase):
    def setUp(self):
        self.category = MediaVideoCategory.objects.create(name='Patient Stories')

    def test_save_normalizes_full_youtube_url(self):
        video = MediaVideo.objects.create(
            title='Sample video',
            description='Video description',
            youtube_id='https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            category=self.category,
            display_size='extra_large',
            date='2026-04-06',
        )

        self.assertEqual(video.youtube_id, 'dQw4w9WgXcQ')
        self.assertEqual(video.youtube_embed_url, 'https://www.youtube.com/embed/dQw4w9WgXcQ')

    def test_serializer_exposes_frontend_ready_video_fields(self):
        factory = APIRequestFactory()
        request = factory.get('/api/media/videos/')
        video = MediaVideo.objects.create(
            title='Sample video',
            description='Video description',
            youtube_id='dQw4w9WgXcQ',
            category=self.category,
            display_size='large',
            date='2026-04-06',
        )

        payload = MediaVideoSerializer(video, context={'request': request}).data

        self.assertEqual(payload['youtube_video_id'], 'dQw4w9WgXcQ')
        self.assertEqual(payload['youtube_embed_url'], 'https://www.youtube.com/embed/dQw4w9WgXcQ')
        self.assertEqual(payload['youtube_thumbnail_url'], 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg')
        self.assertEqual(payload['category_label'], 'Patient Stories')

    def test_uploaded_video_serializer_exposes_video_thumbnail_url(self):
        factory = APIRequestFactory()
        request = factory.get('/api/media/videos/')
        video = MediaVideo.objects.create(
            title='Uploaded video',
            description='Local file',
            content_source=MediaVideo.CONTENT_SOURCE_VIDEO_FILE,
            video_file=SimpleUploadedFile('sample.mp4', b'video-bytes', content_type='video/mp4'),
            video_thumbnail=build_test_image('cover.jpg'),
            category=self.category,
            display_size='large',
            date='2026-04-06',
        )

        payload = MediaVideoSerializer(video, context={'request': request}).data

        self.assertTrue(payload['video_thumbnail_url'].startswith('http://testserver/'))

    def test_content_source_validation_rejects_mismatched_fields(self):
        video = MediaVideo(
            title='Sample video',
            description='Video description',
            content_source=MediaVideo.CONTENT_SOURCE_VIDEO_FILE,
            youtube_id='dQw4w9WgXcQ',
            category=self.category,
            date='2026-04-06',
        )

        with self.assertRaises(ValidationError):
            video.full_clean()


class PressCoverageModelTests(TemporaryMediaRootTestCase):
    def test_press_coverage_requires_fields_for_selected_source(self):
        article = PressCoverage(
            title='TV coverage',
            outlet='TV9',
            description='Feature',
            media_type='Television',
            content_source=PressCoverage.CONTENT_SOURCE_IMAGE,
            date='2026-04-06',
        )

        with self.assertRaises(ValidationError):
            article.full_clean()

    def test_press_coverage_normalizes_youtube_input(self):
        article = PressCoverage.objects.create(
            title='TV coverage',
            outlet='TV9',
            description='Feature',
            media_type='Television',
            content_source=PressCoverage.CONTENT_SOURCE_YOUTUBE,
            youtube_id='https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            date='2026-04-06',
        )

        self.assertEqual(article.youtube_id, 'dQw4w9WgXcQ')
        self.assertEqual(article.youtube_embed_url, 'https://www.youtube.com/embed/dQw4w9WgXcQ')

    def test_press_serializer_exposes_video_fields(self):
        factory = APIRequestFactory()
        request = factory.get('/api/media/press/')
        article = PressCoverage.objects.create(
            title='TV coverage',
            outlet='TV9',
            description='Feature',
            media_type='Television',
            content_source=PressCoverage.CONTENT_SOURCE_IMAGE,
            image=build_test_image(),
            date='2026-04-06',
        )

        payload = PressCoverageSerializer(article, context={'request': request}).data

        self.assertEqual(payload['content_source'], 'image')
        self.assertTrue(payload['image_url'].startswith('http://testserver/'))

    def test_press_uploaded_video_serializer_exposes_video_thumbnail_url(self):
        factory = APIRequestFactory()
        request = factory.get('/api/media/press/')
        article = PressCoverage.objects.create(
            title='Uploaded TV coverage',
            outlet='TV9',
            description='Feature',
            media_type='Television',
            content_source=PressCoverage.CONTENT_SOURCE_VIDEO_FILE,
            video_file=SimpleUploadedFile('press.mp4', b'video-bytes', content_type='video/mp4'),
            video_thumbnail=build_test_image('press-cover.jpg'),
            date='2026-04-06',
        )

        payload = PressCoverageSerializer(article, context={'request': request}).data

        self.assertTrue(payload['video_thumbnail_url'].startswith('http://testserver/'))
