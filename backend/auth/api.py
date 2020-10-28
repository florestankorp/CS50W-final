from knox.models import AuthToken
from rest_framework import generics, permissions
from rest_framework.response import Response

from auth.serializers import LoginSerializer, RegisterSerializer, UserSerializer


class RegisterAPI(generics.GenericAPIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {
                "user": UserSerializer(user, context={"request": request}).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class LoginAPI(generics.GenericAPIView):
    @staticmethod
    def post(request):
        try:
            serializer = LoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data
            _, token = AuthToken.objects.create(user)

            return Response(
                {
                    "user": UserSerializer(
                        user, context={"request": request}
                    ).data,
                    "token": token,
                }
            )
        except Exception as error:
            print(error)
            return Response({"message": str(error)}, status=400)


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
