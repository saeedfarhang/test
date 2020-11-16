from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from .models import Course, Video
from .serializer import CourseSerializer,VideoSerializer


class CourseAPIView(viewsets.ViewSet):
    courseQuery = Course.objects.all()

    
    permission_classes = [permissions.AllowAny, ]
    
    def list(self, request):
        serializer = CourseSerializer(self.courseQuery, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk = None):
        course = get_object_or_404(self.courseQuery, pk = pk)
        serializer = CourseSerializer(course)
        
        videoQuery = Video.objects.filter(course=course)
        videoSerializer = VideoSerializer(videoQuery, many=True)

        return Response([{"course":serializer.data},{"videos":videoSerializer.data}])