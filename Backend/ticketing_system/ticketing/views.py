# ticketing/views.py
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action, api_view
from .models import Employee, Team, Ticket
from .serializers import EmployeeSerializer, TeamSerializer, TicketSerializer
from .assign import assign_ticket
from .utils import retrieve_similar_tickets, predict_priority

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class SimilarTicketsView(generics.ListAPIView):
    serializer_class = TicketSerializer

    def get_queryset(self):
        ticket_id = self.kwargs['pk']
        ticket = Ticket.objects.get(pk=ticket_id)
        description = ticket.description  # Assuming description is used for similarity matching
        similar_ticket_ids = retrieve_similar_tickets(description)
        similar_tickets = Ticket.objects.filter(id__in=similar_ticket_ids)
        return similar_tickets

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def perform_create(self, serializer):
        ticket = serializer.save()
        default_team_name = 'L1'
        assign_ticket(ticket, default_team_name)

    @action(detail=True, methods=['get'])
    def similar_tickets(self, request, pk=None):
        ticket = self.get_object()
        similar_ticket_ids = retrieve_similar_tickets(ticket.description)
        similar_tickets = Ticket.objects.filter(id__in=similar_ticket_ids)
        serializer = self.get_serializer(similar_tickets, many=True)
        return Response(serializer.data)

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PriorityView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        priority = data.get('priority', 'default_value')
        description = data.get('description', 'default_value')
        expected_priority = predict_priority(description)
        correctness = (expected_priority == priority)
        return Response({'expected_priority': expected_priority, 'match': correctness}, status=status.HTTP_200_OK)
