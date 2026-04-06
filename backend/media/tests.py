from django.test import TestCase
from rest_framework.test import APIRequestFactory

from categories.models import MediaVideoCategory
from .models import MediaVideo, extract_youtube_video_id
from .serializers import MediaVideoSerializer


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


class MediaVideoModelTests(TestCase):
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
