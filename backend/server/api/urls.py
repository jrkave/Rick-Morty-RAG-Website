from django.urls import path
from . import views

urlpatterns = [
    # URLs for episodes
    path('episodes/comments/', views.EpisodeCommentListCreate.as_view(), name='episode_comment_list'),
    path('episodes/comments/<int:id>', views.EpisodeCommentDetail.as_view(), name='episode_comment_detail'),
    path('episodes/likes/', views.EpisodeLikeListCreate.as_view(), name='episode_like_list'),
    path('episodes/likes/<int:id>', views.EpisodeLikeDetail.as_view(), name='episode_like_detail'),

    # URLs for characters
    path('characters/comments/', views.CharacterCommentListCreate.as_view(), name='character_comment_list'),
    path('characters/comments/<int:id>', views.CharacterCommentDetail.as_view(), name='character_comment_detail'),
    path('characters/likes/', views.CharacterLikeListCreate.as_view(), name='character_like_list'),
    path('characters/likes/<int:id>', views.CharacterLikeDetail.as_view(), name='character_like_detail'),

    # URL for profiles
    path('profiles/<int:id>', views.ProfileDetail.as_view(), name='profile'),
]
