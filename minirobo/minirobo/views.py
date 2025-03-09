from django.http import HttpResponse
from django.shortcuts import render

def homePage(request):
    return render(request, "robo.html")

def course(request, course):
    return HttpResponse(course)