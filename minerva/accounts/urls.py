from django.urls import path
from .views import SignupView, BlacklistTokenView, UserAPIView

urlpatterns = [
    path('signup/',SignupView.as_view(),name='signup'),
    path('getuser/<id>/',UserAPIView.as_view()),
    path('logout/blacklist/',BlacklistTokenView.as_view(),name='blacklist')
]