from django.contrib import admin
from .models import Course,Video

class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'price', 'master']
admin.site.register(Course, CourseAdmin)


class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'course']
admin.site.register(Video, VideoAdmin)
