import cloudinary.uploader
from rest_framework.response import Response
from rest_framework.views import APIView


class UploadImageAPIView(APIView):
    @staticmethod
    def post(request):
        try:
            file = request.data.get("image")
            response = cloudinary.uploader.upload(file)
            return Response(
                {"status": "success", "data": response,}, status=201
            )
        except FileNotFoundError as error:
            print(error)
            return Response({"message": str(error)}, status=400)
