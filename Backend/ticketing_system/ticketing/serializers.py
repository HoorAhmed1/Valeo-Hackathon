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
    class Meta:
        model = Ticket
        fields = '__all__'
