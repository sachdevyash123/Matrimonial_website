from django.contrib import admin
from .models import CustomUser, Profile, Wishlist,EmailVerificationToken
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Profile)
admin.site.register(Wishlist)
admin.site.register(EmailVerificationToken)
