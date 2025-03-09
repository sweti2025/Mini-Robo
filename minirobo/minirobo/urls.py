from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homePage, name='homePage'),
    path('course/<str:course>/', views.course, name='course')
]
# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.homePage, name='homePage'),
#     path('recipes/', views.ourRecipes, name='ourRecipes'),
#     path('contact/', views.contact, name='contactUs'),
#     path('course/<str:course>/', views.course, name='course'),
# ]