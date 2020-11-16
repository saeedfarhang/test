from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class BlogCategory(models.Model):
    name = models.CharField(max_length=100)

class BlogPost(models.Model):
    # image
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True, auto_now=False)
    author = models.ForeignKey(User , on_delete=models.CASCADE)
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
