from django.urls import path

from upload.views import UploadImageAPIView

urlpatterns = [
    path("upload/", UploadImageAPIView.as_view()),
]
