from rest_framework.serializers import ModelSerializer
from posts.models import Posts


class PostSerializer(ModelSerializer):
    class Meta:
        model = Posts
        fields = ['id', 'title', 'content', 'author', 'create_at', 'update_at']