from django.urls import path

from upload.views import (
    DeleteImageAPIView,
    LikeImageAPIView,
    ListImagesAPIView,
    UploadImageAPIView,
)

urlpatterns = [
    path("upload", UploadImageAPIView.as_view()),
    path("list", ListImagesAPIView.as_view()),
    path("like", LikeImageAPIView.as_view()),
    path("delete", DeleteImageAPIView.as_view()),
]
