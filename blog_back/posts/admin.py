from django.contrib import admin

from posts.models import Posts

# Register your models here.
@admin.register(Posts)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "content", "author", "created_at", "updated_at")