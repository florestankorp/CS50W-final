from django.db import models


class Image(models.Model):
    image = models.ImageField(
        blank=False, null=False, upload_to="geo_entity_pic"
    )
