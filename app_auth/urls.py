from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name="home"),
    path('login/', user_login, name="login"),
    path('signup/', user_signup, name="signup"),
    path('logout/', user_logout, name="logout"),
    path('sessions/', user_sessions, name="sessions"),
]