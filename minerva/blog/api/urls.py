from rest_framework import routers
from .api import BlogPostViewSet

router = routers.DefaultRouter()
router.register('api/blog',BlogPostViewSet, 'blog')

urlpatterns = router.urls