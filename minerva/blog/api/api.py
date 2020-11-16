# APIViews
from rest_framework import viewsets,permissions,generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializer import BlogPostSerializer,BlogCategorySerializer
from blog.models import BlogPost, BlogCategory
from django.contrib.auth import get_user_model
User = get_user_model()


class BlogPostViewSet(viewsets.ViewSet):
    queryset = BlogPost.objects.all()
    cat_query = BlogCategory.objects.all()
    # permission_classes = [permissions.IsAuthenticated]

    def list(self,request):
        permission_classes = [permissions.AllowAny]
        serializer = BlogPostSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        # permission_classes = [permissions.AllowAny]
        post = get_object_or_404(self.queryset, pk=pk)
        serializer = BlogPostSerializer(post)
        # author = get_object_or_404(post.author)
        category = get_object_or_404(self.cat_query, id = post.category.id)
        catserializer = BlogCategorySerializer(category)
        return Response({'post':serializer.data,"category":catserializer.data})

    
    def create(self, request):
        # user = UserAccount
        data = self.request.data
        title = data['title']
        content = data['content']
        category = data['category']
        categoryInc, created = BlogCategory.objects.get_or_create(name = category)
        # categoryInc.save()
        post = BlogPost.objects.create(title=title, content= content , author=request.user , category= categoryInc )
        post.save()
        serializer = BlogPostSerializer(post)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [permissions.AllowAny]
        elif self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]

        return [permission() for permission in permission_classes]


# class BlogPostViewSet(viewsets.ModelViewSet):
#     queryset = BlogPost.objects.all()
#     permission_classes = [permissions.IsAuthenticated, ]
#     serializer_class = BlogPostSerializer