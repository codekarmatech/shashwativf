(function () {
  function setFieldVisibility(fieldName, visible) {
    document.querySelectorAll('.field-' + fieldName).forEach(function (element) {
      element.style.display = visible ? '' : 'none';
    });
  }

  function updateVisibility() {
    var sourceField = document.getElementById('id_content_source');
    if (!sourceField) {
      return;
    }

    var source = sourceField.value;
    var hasImageField = document.querySelector('.field-image') !== null;

    setFieldVisibility('youtube_id', source === 'youtube');
    setFieldVisibility('video_file', source === 'video_file');
    setFieldVisibility('video_thumbnail', source === 'video_file');

    if (hasImageField) {
      setFieldVisibility('image', source === 'image');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var sourceField = document.getElementById('id_content_source');
    if (!sourceField) {
      return;
    }

    sourceField.addEventListener('change', updateVisibility);
    updateVisibility();
  });
})();
