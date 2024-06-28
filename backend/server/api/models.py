from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    avatar_url = models.TextField()
    bio = models.TextField()

    def __str__(self):
        return self.owner.username

class Episode_Like(models.Model):
    id = models.AutoField(primary_key=True)
    episode_id = models.IntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('episode_id', 'owner'))

class Episode_Comment(models.Model):
    id = models.AutoField(primary_key=True)
    episode_id = models.IntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

class Character_Like(models.Model):
    id = models.AutoField(primary_key=True)
    character_id = models.IntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('character_id', 'owner'))

class Character_Comment(models.Model):
    id = models.AutoField(primary_key=True)
    character_id = models.IntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

class Episode_Rating(models.Model):
    id = models.AutoField(primary_key=True)
    episode_id = models.IntegerField()
    rating = models.IntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
