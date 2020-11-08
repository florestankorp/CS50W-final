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
        try:
            tag = request.query_params.get("tag")
            if tag is None:
                response = cloudinary.api.resources(max_results=30, tags=True)
            else:
                response = cloudinary.api.resources_by_tag(tag, tags=True)
            return Response({"status": "success", "data": response}, status=200)
        except Exception as error:
            print(error)
            return Response({"message": str(error)}, status=400)


class DeleteImageAPIView(APIView):
    @staticmethod
    def delete(request):
        try:
            public_id = request.data.get("public_id")
            response = cloudinary.uploader.destroy(public_id=public_id)
            return Response({"status": "success", "data": response}, status=200)
        except Exception as error:
            print(error)
            return Response({"message": str(error)}, status=400)


class LikeImageAPIView(APIView):
    @staticmethod
    def put(request):
        FAV = "fav"
        TAGS = "tags"
        try:
            public_id = request.data.get("public_id")
            image_info = cloudinary.api.resource(public_id)

            if TAGS in image_info and FAV in image_info[TAGS]:
                response = cloudinary.uploader.remove_tag(
                    FAV, public_ids=public_id
                )
                print("Removed tag", FAV, "from:", public_id)
                return Response(
                    {"status": "success", "data": response}, status=200
                )
            else:
                response = cloudinary.uploader.add_tag(
                    FAV, public_ids=public_id
                )

                print("Added tag", FAV, "to:", public_id)
                return Response(
                    {"status": "success", "data": response}, status=200
                )

            return Response({"message": "Tag not found"}, status=404)
        except Exception as error:
            print(error)
            return Response({"message": str(error)}, status=400)
