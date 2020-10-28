import cloudinary.api
import cloudinary.uploader
from rest_framework.response import Response
from rest_framework.views import APIView


class UploadImageAPIView(APIView):
    @staticmethod
    def post(request):
        try:
            file = request.data.get("image")
            response = cloudinary.uploader.upload(file)
            return Response({"status": "success", "data": response}, status=201)
        except FileNotFoundError as error:
            print(error)
            return Response({"message": str(error)}, status=400)


class ListImagesAPIView(APIView):
    @staticmethod
    def get(request):
        print()
        try:
            response = cloudinary.api.resources()
            return Response({"status": "success", "data": response}, status=200)
        except Exception as error:
            print(error)
            return Response({"message": str(error)}, status=400)
