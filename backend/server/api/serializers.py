from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, Episode_Comment, Episode_Like, Character_Comment, Character_Like, Episode_Rating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['owner', 'first_name', 'last_name', 'avatar_url', 'bio']
        extra_kwargs = {'owner': {'read_only': True}}

class EpisodeCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode_Comment
        fields = ['id', 'episode_id' 'owner', 'content', 'created_at']
        extra_kwargs = {'owner': {'read_only': True}}

class EpisodeLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode_Like
        fields = ['id', 'episode_id', 'owner']
        extra_kwargs = {'owner': {'read_only': True}}

class CharacterCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character_Comment
        fields = ['id', 'character_id', 'owner', 'content', 'created_at']
        extra_kwargs = {'owner': {'read_only': True}}

class CharacterLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character_Like
        fields = ['id', 'character_id', 'owner']
        extra_kwargs = {'owner': {'read_only': True}}
    
class EpisodeRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode_Rating
        fields = ['id', 'episode_id', 'rating', 'owner']
        extra_kwards = {'owner': {'read_only': True}}