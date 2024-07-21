from .models import Employee, Team

def calculate_load(dev_tickets):
    load = 0
    for ticket in dev_tickets:
        if ticket.priority == 'Blocker':
            load += 3
        elif ticket.priority == 'Major':
            load += 2
        elif ticket.priority == 'Minor':
            load += 1
    return load

def find_least_loaded_in_team(team_name):
    min_load = float('inf')
    selected_dev = None
    team = Team.objects.get(name=team_name)
    developers = Employee.objects.filter(team=team)

    for dev in developers:
        load = calculate_load(dev.ticket_set.all())
        if load < min_load:
            min_load = load
            selected_dev = dev
        elif load == min_load:
            if dev.monthly_blockers < selected_dev.monthly_blockers:
                selected_dev = dev

    return selected_dev

def assign_ticket(ticket, target_team_name):
    selected_dev = find_least_loaded_in_team(target_team_name)

    ticket.assigned_to = selected_dev
    ticket.save()

    load_increase = calculate_load([ticket])
    selected_dev.workload += load_increase
    if ticket.priority == 'Blocker':
        selected_dev.monthly_blockers += 1

    selected_dev.save()

    return selected_dev