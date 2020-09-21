from rest_framework import serializers

from api.models import Image


# Serializers define the API representation.
class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ["title", "cover"]
