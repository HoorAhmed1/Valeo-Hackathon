from .models import Employee, Ticket

def calculate_ticket_load(ticket):
    if ticket.priority == 'Blocker':
        return 3
    elif ticket.priority == 'Major':
        return 2
    elif ticket.priority == 'Minor':
        return 1
    return 0

def find_least_loaded(devs):
    min_load = float('inf')
    selected_dev = None
    for dev in devs:
        if dev.workload < min_load:
            min_load = dev.workload
            selected_dev = dev
        elif dev.workload == min_load:
            if dev.monthly_blockers < selected_dev.monthly_blockers:
                selected_dev = dev
    return selected_dev

def assign_ticket(ticket):
    developers = Employee.objects.all()
    selected_dev = find_least_loaded(developers)

    ticket.assigned_to = selected_dev
    ticket.save()

    load_increase = calculate_ticket_load(ticket)
    selected_dev.workload += load_increase

    if ticket.priority == 'Blocker':
        selected_dev.monthly_blockers += 1

    selected_dev.save(update_fields=['workload', 'monthly_blockers'])  

    return selected_dev
