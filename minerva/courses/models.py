from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class Course(models.Model):
    title = models.CharField(max_length= 255)
    description = models.TextField()
    price = models.CharField(max_length=12)
    students = models.ManyToManyField(User, related_name='students')
    master = models.ForeignKey(User, on_delete=models.CASCADE)
    

    def __str__(self):
        return self.title

class Video(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return self.title