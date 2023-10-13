from rest_framework import serializers
from .models import CustomUser, Profile, Wishlist, EmailVerificationToken
from datetime import date


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['email']


class ViewProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ['email', 'id']


class ProfileUpdate(serializers.ModelSerializer):
    profile = ViewProfileSerializer()
    age = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', "profile", 'age']
        read_only_fields = ['id''age']

    def get_age(self, obj):
        today = date.today()
        birth_date = obj.profile.date
        age = today.year - birth_date.year - \
            ((today.month, today.day) < (birth_date.month, birth_date.day))
        return age

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['age'] = self.get_age(instance)
        return data

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.save()
        profile.first_name = profile_data.get('first_name', profile.first_name)
        profile.middle_name = profile_data.get(
            'middle_name', profile.middle_name)
        profile.last_name = profile_data.get('last_name', profile.last_name)
        profile.image = profile_data.get('image', profile.image)
        profile.gender = profile_data.get('gender', profile.gender)
        profile.number = profile_data.get('number', profile.number)
        profile.date = profile_data.get('date', profile.date)
        profile.height = profile_data.get('height', profile.height)
        profile.income = profile_data.get('income', profile.income)
        profile.prlocation = profile_data.get('prlocation', profile.prlocation)
        profile.cast = profile_data.get('cast', profile.cast)
        profile.hobbies = profile_data.get('hobbies', profile.hobbies)
        profile.disability = profile_data.get('disability', profile.disability)
        profile.father_name = profile_data.get(
            'father_name', profile.father_name)
        profile.mother_name = profile_data.get(
            'mother_name', profile.mother_name)
        profile.education = profile_data.get('education', profile.education)
        profile.occupation = profile_data.get('occupation', profile.occupation)
        profile.status = profile_data.get('status', profile.status)
        profile.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    age = serializers.SerializerMethodField()
    

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', "profile",'age']

    def get_age(self, obj):
        today = date.today()
        birth_date = obj.profile.date
        age = today.year - birth_date.year - \
            ((today.month, today.day) < (birth_date.month, birth_date.day))
        return age

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['age'] = self.get_age(instance)
        return data


class Rrgistrionsiralizer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        print(instance)
        return instance


class Wishlistserializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['email', 'profile', 'date_added']
