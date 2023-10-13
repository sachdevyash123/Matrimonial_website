from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from .serializers import Rrgistrionsiralizer, UserProfileSerializer, ProfileUpdate, ViewProfileSerializer, Wishlistserializer
from rest_framework.permissions import AllowAny
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from .models import CustomUser, Profile, Wishlist, EmailVerificationToken
from django.db.models import Subquery
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.tokens import default_token_generator
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from django.conf import settings
# Create your views here.


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        data = request.data
        profile = {}
        for i in data:
            if i == 'username' or i == 'email' or i == 'password':
                pass
            else:
                profile[i] = data.get(i)
        data['profile'] = profile
        user_data = {}
        profile = {}
        user_data['username'] = data.get('username')
        user_data['email'] = data.get('email')
        user_data['password'] = data.get('password')
        user_data['profile'] = data.get('profile')
        print(user_data)
        serializer = Rrgistrionsiralizer(data=user_data)
        if serializer.is_valid():
            profile_data = serializer.validated_data.pop('profile')
            newuser = serializer.save()
            if newuser:
                profile = Profile.objects.create(email=newuser, **profile_data)
                profile.save()
                token = default_token_generator.make_token(newuser)
                EmailVerificationToken.objects.create(
                    user=newuser, token=token)
                user_ip = self.get_client_ip(request)
                print(user_ip)
                verification_link = f"http://{user_ip}:8000/api/user/verify-email/{token}/"
                subject = "Email Verification"
                message = f"Click the following link to verify your email: {verification_link}"
                from_email = settings.EMAIL_HOST_USER
                recipient_list = [newuser.email]
                send_mail(subject, message, from_email, recipient_list)
            return Response({'message': "verify your Email"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class EmailVerificationView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, token):
            try:
                token_obj = get_object_or_404(EmailVerificationToken, token=token)
                if default_token_generator.check_token(token_obj.user, token):
                    token_obj.user.is_active = True
                    token_obj.user.save()
                    token_obj.delete()
                    return Response({"message": "Email successfully verified."}, status=status.HTTP_200_OK)

                return Response({"message": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"message": "Email is alredy Verifed"}, status=status.HTTP_400_BAD_REQUEST)


class ProfileUpdateview(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = ProfileUpdate(user)
        return Response(serializer.data)

    def put(self, request):
        data = request.data.copy()
        profile = {}
        for i in data:
            if i == 'username' or i == 'email':
                pass
            else:
                profile[i] = data[i]
        data['profile'] = profile
        user_data = {}
        profile = {}
        user_data['username'] = data['username']
        user_data['email'] = data['email']
        user_data['profile'] = data['profile']
        print(request.user.id)
        if not user_data.get('profile').get('image'):
            print(Profile.objects.get(email=request.user.id).image)
            user_data['profile']['image'] = Profile.objects.get(
                email=request.user.id).image
        serializer = ProfileUpdate(request.user, data=user_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = request.user
        if user == request.user:
            user.delete()
            return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'You are not authorized to delete this user'}, status=status.HTTP_403_FORBIDDEN)


class UserView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        authenticated_user = self.request.user
        user_gender = authenticated_user.profile.gender
        opposite_gender = 'Male' if user_gender == 'Female' else 'Female'
        subquery = Profile.objects.filter(
            gender=opposite_gender).values("email")
        print(subquery)
        queryset = CustomUser.objects.exclude(
            id=authenticated_user.id).filter(id__in=Subquery(subquery))
        print(queryset)
        return queryset


class Userprofile(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    lookup_field = 'id'
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({"message": "Token successfully blacklisted."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": {"Token is not given"}}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError as e:
            error_message = str(e)
            return Response({"message": error_message}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": "An error occurred while processing the request."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class WishListGetView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = Wishlistserializer

    def get_queryset(self):
        email = self.request.user
        queryset = Wishlist.objects.filter(email=email)
        return queryset


class AddWishlistView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = Wishlistserializer

    def post(self, request, id):
        email = request.user.id
        pk = id
        data = {"email": email, 'profile': id}
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": 'add to wish list'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class DelteWishlistView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, id):
        try:
            data = Wishlist.objects.get(email=request.user.id, profile=id)
            data.delete()
            return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'error': 'You are not authorized to delete this user'}, status=status.HTTP_403_FORBIDDEN)


class ResendVerificationLinkView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = get_object_or_404(CustomUser, email=email)
        if user.is_active:
            return Response(
                {"detail": "Email is already verified."},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif not email:
            return Response(
                {"detail": "Email is Required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        token = default_token_generator.make_token(user)
        EmailVerificationToken.objects.update_or_create(
            user=user, defaults={'token': token})
        user_ip = self.get_client_ip(request)
        print(user_ip)
        verification_link = f"http://{user_ip}:8000/api/user/verify-email/{token}/"
        subject = "Email Verification"
        message = f"Click the following link to verify your email: {verification_link}"
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list)

        return Response(
            {"detail": "Verification link has been sent to your email."},
            status=status.HTTP_200_OK
        )

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            user = CustomUser.objects.get(email=request.data['email'])
        except CustomUser.DoesNotExist:
            return Response({"detail": "User does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        if user.is_active:
            response = super().post(request, *args, **kwargs)
            return response
        else:
            return Response({"detail": "Email not verified."}, status=status.HTTP_400_BAD_REQUEST)
