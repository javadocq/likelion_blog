from django.db import models

# Create your models here.
class Posts(models.Model):
    title = models.CharField(max_length=255) #제목
    content = models.TextField() #내용
    author = models.CharField(max_length=255) #작성자
    created_at = models.DateTimeField(auto_now_add=True) #객체가 처음 생성될 때만 현재 시간 생성
    updated_at = models.DateTimeField(auto_now=True) #객체가 저장될 때 현재 시간 입력