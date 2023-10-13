from django.db import models
import datetime
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# Create your models here.
heights = [
    ("4'6", "4'6"), ("4'7", "4'7"), ("4'8", "4'8"), ("4'9",
                                                     "4'9"), ("5'0", "5'0"), ("5'1", "5'1"),
    ("5'2", "5'2"), ("5'3", "5'3"), ("5'4", "5'4"), ("5'5",
                                                     "5'5"), ("5'6", "5'6"), ("5'7", "5'7"),
    ("5'8", "5'8"), ("5'9", "5'9"), ("6'0", "6'0"), ("6'1",
                                                     "6'1"), ("6'2", "6'2"), ("6'3", "6'3"),
    ("6'4", "6'4"), ("6'5", "6'5"), ("6'6", "6'6"), ("6'7",
                                                     "6'7"), ("6'8", "6'8"), ("6'9", "6'9"), ("7'0", "7'0")
]
casts = [("Hindu", "Hindu"), ("Jain", "Jain"),
         ("Punjabi", "Punjabi"), ("Sindhi", "Sindhi")]


class CustomAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class EmailVerificationToken(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,default=1)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Profile(models.Model):
    email = models.OneToOneField(CustomUser, on_delete=models.CASCADE,)
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    image = models.ImageField(upload_to="media/")
    gender = models.CharField(max_length=20, choices=(
        ("Male", "Male"), ("Female", "Female")))
    number = models.PositiveBigIntegerField()
    date = models.DateField(default=timezone.now)
    height = models.CharField(max_length=10, choices=heights, default="5'9")
    cast = models.CharField(max_length=10, choices=casts, default='Hindu')
    income = models.CharField(max_length=50, choices=[("0-2.5", "0-2.5"), ("2.5-5.0", "2.5-5.0"), ("5.0-7.5", "5.0-7.5"), (
        "7.5-10", "7.5-10"), ("10-20", "10-20"), ("20-30", "20-30"), ("30-40", "30-40"), ("40-50", "40-50"), ("50+", "50+")], default="0-2.5")
    prlocation = models.CharField(max_length=100, default='')
    hobbies = models.CharField(max_length=100, default='')
    disability = models.BooleanField(default=False)
    father_name = models.CharField(max_length=100, default='')
    mother_name = models.CharField(max_length=100, default='')
    education = models.CharField(max_length=100, default='')
    occupation = models.CharField(max_length=100, default='')
    status = models.CharField(max_length=100, choices=[(
        'single', 'single'), ('divorced', 'divorced'), ('widowed', 'widowed')], default='single')
    REQUIRED_FIELDS = ['first_name', 'middle_name', 'last_name', 'image', 'gender', 'number', 'date', 'height', 'cast',
                       'income', 'prlocation', 'hobbies', 'disability', 'father_name', 'mother_name', 'education', 'occupation', 'status']

    def __str__(self):
        return self.first_name


class Wishlist(models.Model):
    email = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('email', 'profile')
