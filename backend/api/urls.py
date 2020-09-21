from django.urls import include, path
from rest_framework import routers

from . import views

# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
# router.register(r"upload", UploadViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("upload/", views.upload),
    path(
        "api-auth/", include("rest_framework.urls", namespace="rest_framework")
    ),
]
