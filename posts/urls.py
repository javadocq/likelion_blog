from django.urls import path

from posts import views


urlpatterns = [
    path('', views.PostList.as_view()),
    # path('<int:id>/', views.PostDetail.as_view())
]