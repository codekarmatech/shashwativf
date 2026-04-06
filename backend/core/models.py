from django.db import models

class SiteConfiguration(models.Model):
    """
    Global settings for the website, including SEO and social media previews.
    Only one instance of this model should exist.
    """
    site_name = models.CharField(max_length=255, default="Shashwat IVF & Women's Hospital")
    meta_title = models.CharField(
        max_length=255, 
        default="Shashwat IVF & Women's Hospital | Best IVF Centre in Ahmedabad",
        help_text="The title that appears in Google search and WhatsApp previews."
    )
    meta_description = models.TextField(
        default="Shashwat IVF & Women's Hospital is the leading fertility clinic in Ahmedabad providing advanced IVF treatments, ICSI, Egg Freezing, and comprehensive women's healthcare.",
        help_text="The description that appears in Google search and WhatsApp previews."
    )
    og_image = models.ImageField(
        upload_to='site_config/',
        null=True,
        blank=True,
        help_text="The image that appears when you share the website link on WhatsApp/Facebook (Recommended 1200x630px)."
    )
    favicon = models.FileField(
        upload_to='site_config/',
        null=True,
        blank=True,
        help_text="The small icon in the browser tab."
    )
    
    # Contact Info (Dynamic)
    contact_phone = models.CharField(max_length=20, default="+91 99252 44431")
    contact_email = models.EmailField(default="dritalpunjabi@gmail.com")
    
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"

    def __str__(self):
        return "Global Site Configuration"

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and SiteConfiguration.objects.exists():
            return
        super().save(*args, **kwargs)
