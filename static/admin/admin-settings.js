document.addEventListener('DOMContentLoaded', () => {
  const headingInput = document.getElementById('heading');
  const subheadingInput = document.getElementById('subheading');
  const imageInput = document.getElementById('image');

  const previewHeading = document.getElementById('previewHeading');
  const previewSubheading = document.getElementById('previewSubheading');
  const heroPreview = document.getElementById('heroPreview');

  // Live text preview
  if (headingInput) {
    headingInput.addEventListener('input', () => {
      previewHeading.textContent = headingInput.value || 'Heading goes here';
    });
  }

  if (subheadingInput) {
    subheadingInput.addEventListener('input', () => {
      previewSubheading.textContent = subheadingInput.value || 'Subheading goes here';
    });
  }

  // Live image preview
  if (imageInput) {
    imageInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const url = URL.createObjectURL(file);
      heroPreview.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.25)), url('${url}')`;
    });
  }
});
