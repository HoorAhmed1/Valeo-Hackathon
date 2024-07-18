from rest_framework import serializers
from .models import Employee, Team, Ticket

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name']


class EmployeeSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)  # Include TeamSerializer for nested serialization
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team', write_only=True)

    class Meta:
        model = Employee
        fields = ['id', 'name', 'workload', 'team_id', 'team']

    def create(self, validated_data):
        try:
            team_id = validated_data.pop('team_id')
            team_instance = Team.objects.get(id=team_id)
            employee = Employee.objects.create(team=team_instance, **validated_data)
            return employee
        except KeyError:
            raise serializers.ValidationError("Team ID must be provided.")
        except Team.DoesNotExist:
            raise serializers.ValidationError("Team matching query does not exist.")
                
class TicketSerializer(serializers.ModelSerializer):
    assigned_to = serializers.SerializerMethodField()
    
    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'priority', 'status', 'assigned_to','team', 'created_at', 'updated_at']

    def get_assigned_to(self, obj):
        if obj.assigned_to:
            return {
                'id': obj.assigned_to.id,
                'name': obj.assigned_to.name
            }
        return None

    def create(self, validated_data):
        # Fetch the default team instance
        try:
            default_team_name = 'L1'
            team_instance = Team.objects.get(name=default_team_name)
        except Team.DoesNotExist:
            raise serializers.ValidationError("Default team does not exist.")

        validated_data['team'] = team_instance
        ticket = Ticket.objects.create(**validated_data)

        # Assign ticket dynamically to the default team
        from .assign import assign_ticket
        assign_ticket(ticket, default_team_name)

        return ticket

