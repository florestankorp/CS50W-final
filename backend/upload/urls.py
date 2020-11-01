from django.urls import path

from upload.views import LikeImageAPIView, ListImagesAPIView, UploadImageAPIView

urlpatterns = [
    path("list", ListImagesAPIView.as_view()),
    path("upload", UploadImageAPIView.as_view()),
    path("like", LikeImageAPIView.as_view()),
]
