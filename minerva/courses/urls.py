from rest_framework import routers
from .views import CourseAPIView

router = routers.DefaultRouter()
router.register('api/courses', CourseAPIView,'courses')

urlpatterns = router.urls