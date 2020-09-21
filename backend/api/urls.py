from django.urls import include, path

from api.views import UploadImageAPIView

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("upload/", UploadImageAPIView.as_view()),
    path(
        "api-auth/", include("rest_framework.urls", namespace="rest_framework")
    ),
]
