from django.db import models

# Create your models here.
class Employee(models.Model):
    name = models.CharField(max_length=100)
    workload = models.IntegerField(default=0)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)
    monthly_blockers = models.IntegerField(default=0) 

    def __str__(self):
        return self.name
    
class Team(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Ticket(models.Model):
    PRIORITY_CHOICES = [
        ('Blocker', 'Blocker'),
        ('Major', 'Major'),
        ('Minor', 'Minor'),
    ]
    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('Resolved', 'Resolved'),
    ]
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, default=None) 
    id = models.AutoField(primary_key=True) 
    title = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Minor')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Open')
    assigned_to = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    