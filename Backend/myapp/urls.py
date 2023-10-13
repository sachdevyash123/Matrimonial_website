from .views import CustomUserCreate, BlacklistTokenView, UserView, ProfileUpdateview, WishListGetView, AddWishlistView, DelteWishlistView, Userprofile, ResendVerificationLinkView, EmailVerificationView
from django.conf import settings
from django.urls import path
from django.conf.urls.static import static

urlpatterns = [
    path('register/',CustomUserCreate.as_view(),name='register'),
    path('logout/',BlacklistTokenView.as_view(),name='logout'),
    path('userview/',UserView.as_view(),name='User'),
    path('profile/',ProfileUpdateview.as_view(),name='profile'),
    path('getprofile/<int:id>',Userprofile.as_view(),name='profile-user'),
    path('wishlistGet/',WishListGetView.as_view(),name='wishlist'),
    path('addtowishlist/<int:id>',AddWishlistView.as_view(),name='addtowishlist'),
    path('deletewishlist/<int:id>',DelteWishlistView.as_view(),name='deletewishlist'),
    path('resend-verification/', ResendVerificationLinkView.as_view(),
         name='resend_verification_link'),
    path('verify-email/<str:token>/',
         EmailVerificationView.as_view(), name='verify_email'),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
