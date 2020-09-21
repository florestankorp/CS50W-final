from rest_framework.decorators import api_view

from api.serializers import ImageSerializer


@api_view(["POST"])
def upload(request):
    if request.method == "POST":
        serializer = ImageSerializer(data=request.data)

        print(request)


# ViewSets define the view behavior.
# class UploadViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
