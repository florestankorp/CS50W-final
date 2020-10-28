from django.urls import path

from upload.views import ListImagesAPIView, UploadImageAPIView

urlpatterns = [
    path("list/", ListImagesAPIView.as_view()),
    path("upload/", UploadImageAPIView.as_view()),
]
