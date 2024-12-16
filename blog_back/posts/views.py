from http.client import NOT_FOUND
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView

from posts.models import Posts
from posts.serializer import PostSerializer

# Create your views here.
class PostList(APIView):
    def get(self, request): #Get /posts
        all_posts = Posts.objects.all()
        serializer = PostSerializer(all_posts, many=True)
        return Response({"results" : serializer.data}, status = 200)
    
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
class PostDetail(APIView):
    def get_object(self,id):
        try:
            post = Posts.objects.get(id = id)
        except:
            raise NOT_FOUND
        return post
    def get(self, request, id):
        post = self.get_object(id)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    def put(self, request, id):
        post = self.get_object(id)
        serializer = PostSerializer(post, data=request.data, partial =True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    def delete(self, request, id):
        post = self.get_object(id)
        post.delete()
        return Response(status=200)
