# ticketing/views.py
# Create your views here.
from .models import Employee, Team, Ticket
from .serializers import EmployeeSerializer, TeamSerializer, TicketSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from .assign import assign_ticket
from .priority_check import predict_priority

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    
    def perform_create(self, serializer):
        ticket = serializer.save()
        default_team_name = 'L1'
        assign_ticket(ticket,default_team_name)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PriorityView():
    def get(self, request, *args, **kwargs):
        # Get request parameters
        priority = request.GET.get('priority', 'default_value')
        description = request.GET.get('descroption', 'default_value')
        
        # Apply a function to the request parameters
        expected_priority = predict_priority(description)
        correctness = (expected_priority == priority)
        # Return the result as a JSON response
        return Response({'expected_priority': expected_priority, 'match' : correctness}, status=status.HTTP_200_OK)
