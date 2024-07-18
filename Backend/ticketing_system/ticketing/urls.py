# app_name/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from views import PriorityView

router = DefaultRouter()
router.register(r'employees', views.EmployeeViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'tickets', views.TicketViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('priority-check/', PriorityView.as_view(), name='custom_ticket'),

]