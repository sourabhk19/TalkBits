"""talkbits URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import home_view,tweet_detail_view,tweet_list_view,tweet_create_view, tweet_delete_view,tweet_action_view
urlpatterns = [
    path('',tweet_list_view),
    path('action/',tweet_action_view),
    path('create/',tweet_create_view),
    path('<int:tweet_id>/',tweet_detail_view),
    path('<int:tweet_id>/delete/',tweet_delete_view),
    
    
    
]
