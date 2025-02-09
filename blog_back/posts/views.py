from django.http import Http404
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

from posts.models import Posts
from posts.serializer import PostSerializer

# Create your views here.
class PostList(APIView):
    def get(self, request): #method GET /posts
        all_posts = Posts.objects.all() #모든 객체를 갖고오기
        serializer = PostSerializer(all_posts, many=True)
        return Response(serializer.data, status=200)
    
    def post(self, request):
        serializer = PostSerializer(data = request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
class PostDetail(APIView):
    def get_object(self, id):
        try:
            post = Posts.objects.get(id = id)
        except:
            raise Http404("Post not found")
        return post
    
    def get(self, request, id):
        post = self.get_object(id)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    
    def put(self, request, id):
        post = self.get_object(id)
        serializer = PostSerializer(post, data = request.data, partial = True) 
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
        
    def delete(self, request, id):
        post = self.get_object(id)
        post.delete()
        return Response(status=200)
    
