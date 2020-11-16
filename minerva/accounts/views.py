from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken

from .serializer import UserSerializer

class SignupView(APIView):
    permission_classes = [permissions.AllowAny, ]
    def post(self, request, format = None):
        data = self.request.data
        email = data['email']
        name = data['name']
        password = data['password']
        password2 = data['password']

        if password == password2:
            if User.objects.filter(email = email).exists():
                return Response({'error':'this email already exists'})
            else:
                if len(password) < 6:
                    return Response({'error': 'password must have more than 5 chars'})
                else:
                    user = User.objects.create_user(email = email, name = name , password = password)
                    user.save()
                    return Response({'success':'new user been created!'})
        else:
            return Response({'error':'passwords didnt match'})


class BlacklistTokenView(APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        try:
            refresh_token = request.data["refrsh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    # queryset = User.objects.all()
    def get(self, request, id):
        query = User.objects.get(id = id)
        data = request.data
        serializer = UserSerializer(query, many=False)
        return Response(serializer.data)