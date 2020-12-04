from django.urls import path

from image.views import (
    DeleteImageAPIView,
    ListImagesAPIView,
    TagImageAPIView,
    UploadImageAPIView,
)

urlpatterns = [
    path("image", UploadImageAPIView.as_view()),
    path("list", ListImagesAPIView.as_view()),
    path("tag", TagImageAPIView.as_view()),
    path("delete", DeleteImageAPIView.as_view()),
]
