# ticketing/views.py
# Create your views here.
from .models import Employee, Team, Ticket
from .serializers import EmployeeSerializer, TeamSerializer, TicketSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from .assign import assign_ticket


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    
    def perform_create(self, serializer):
        ticket = serializer.save()
        assign_ticket(ticket)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
