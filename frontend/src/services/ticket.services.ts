import axios from "axios";
import { GetTicket, PriorityTicket, ResponsePriorityTicket, SendTicket } from "../types/serialized-input";
//When the customer create a ticket
export async function PostCreateTicket(ticket: SendTicket) {
    const response = await axios.post('http://127.0.0.1:8000/api/tickets/', {
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority
    });
    return response.data;
}
//When the user selct one ticket check db for similar description 
export async function GetSimilarTicket(ticketid: number) {
    const response = await axios.get(' http://127.0.0.1:8000/api/tickets/' + ticketid + '/similar_tickets/');
    return response.data;
}

export async function GetAllTicket(): Promise<GetTicket[]> {
    const response = await axios.get(' http://127.0.0.1:8000/api/tickets/');
    return response.data;
}

export async function PostPriorityCheck(ticket: PriorityTicket):Promise<ResponsePriorityTicket> {
    const response = await axios.post('http://127.0.0.1:8000/api/priority-check/', {
        description: ticket.description,
        priority: ticket.priority
    });
    return response.data;
}