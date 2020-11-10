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


class TagImageAPIView(APIView):
    @staticmethod
    def put(request):
        FAV = "fav"
        TAGS = "tags"
        RATE = "rate"

        try:
            public_id = request.data.get("public_id")
            tag = request.data.get("tag")
            image_info = cloudinary.api.resource(public_id)

            if TAGS in image_info and tag in image_info[TAGS]:
                response = cloudinary.uploader.remove_tag(
                    tag, public_ids=public_id
                )
                print("Removed tag", tag, "from:", public_id)
                return Response(
                    {"status": "success", "data": response}, status=200
                )
            else:
                response = cloudinary.uploader.add_tag(
                    tag, public_ids=public_id
                )

                print("Added tag", tag, "to:", public_id)
                return Response(
                    {"status": "success", "data": response}, status=200
                )

            return Response({"message": "Tag not found"}, status=404)
        except Exception as error:
            print(error)
            return Response({"message": str(error)}, status=400)
