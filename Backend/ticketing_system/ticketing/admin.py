from django.contrib import admin

# Register your models here.
from .models import Employee, Team, Ticket

admin.site.register(Employee)
admin.site.register(Team)
admin.site.register(Ticket)