from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ProfileSerializer, EpisodeCommentSerializer, EpisodeLikeSerializer, CharacterCommentSerializer, CharacterLikeSerializer, EpisodeRatingSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, SAFE_METHODS
from .models import Profile, Episode_Comment, Episode_Like, Character_Comment, Character_Like, Episode_Rating
# from .permissions import IsOwnerOrReadOnly

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# LIST / CREATE VIEWS
class BaseListView(generics.ListCreateAPIView):
    """ Base view for listing the queryset of or creating a new model. """
    
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class EpisodeCommentListCreate(BaseListView):
    queryset = Episode_Comment.objects.all()
    serializer_class = EpisodeCommentSerializer

class EpisodeLikeListCreate(BaseListView):
    queryset = Episode_Like.objects.all()
    serializer_class = EpisodeLikeSerializer

class CharacterCommentListCreate(BaseListView):
    queryset = Character_Comment.objects.all()
    serializer_class = CharacterCommentSerializer

class CharacterLikeListCreate(BaseListView):
    queryset = Character_Like.objects.all()
    serializer_class = CharacterLikeSerializer

class EpisodeRatingListCreate(BaseListView):
    queryset = Episode_Rating.objects.all()
    serializer_class = EpisodeRatingSerializer

# RETRIEVE, UPDATE, DELETE VIEWS
class BaseOwnerDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Base view for retrieving, updating, and deleting models owned by the user."""
    
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """ Returns the queryset of objects that the view will operate on, filtering by ownership. """
        if self.model is None:
            raise NotImplementedError('Subclasses must define the model.')
        # e.g., 'GET'
        if self.request.method in SAFE_METHODS:
            return self.model.objects.all()
        # e.g., 'PUT', 'POST', 'DELETE', etc.
        else:
            return self.model.objects.filter(owner=self.request.user)

class EpisodeCommentDetail(BaseOwnerDetailView):
    model = Episode_Comment
    serializer_class = EpisodeCommentSerializer

class EpisodeLikeDetail(BaseOwnerDetailView):
    model = Episode_Like
    serializer_class = EpisodeLikeSerializer

class CharacterCommentDetail(BaseOwnerDetailView):
    model = Character_Comment
    serializer_class = CharacterCommentSerializer

class CharacterLikeDetail(BaseOwnerDetailView):
    model = Character_Like
    serializer_class = CharacterLikeSerializer

class ProfileDetail(BaseOwnerDetailView):
    model = Profile
    serializer_class = ProfileSerializer

class EpisodeRatingDetail(BaseOwnerDetailView):
    model = Episode_Rating
    serializer_class = EpisodeRatingSerializer
