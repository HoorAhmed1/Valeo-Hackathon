import axios from "axios";
import { GetTicket, SendTicket } from "../types/serialized-input";
//When the customer create a ticket
export async function PostCreateTicket(ticket: SendTicket) {
    const response = await axios.post('http://localhost:8000/api/tickets/', {
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority
    });
    return response.data;
}
//When the user selct one ticket check db for similar description 
export async function GetSimilarTicket(ticketid: number) {
    const response = await axios.get('http://localhost:8000/api/tickets/' + ticketid + '/similar_tickets/');
    return response.data;
}

export async function GetAllTicket(): Promise<GetTicket[]> {
    const response = await axios.get('http://localhost:8000/api/tickets/');
    return response.data;
}

//   export function createTicket(ticket:SendTicket) {
//     return axios.put('http://localhost:8000/api/tickets/' + ticketid + '/', {
//       FirstName:ticket.FirstName.value,
//       LastName:ticket.LastName.value,
//       RegistrationNo:ticket.RegistrationNo.value,
//       Email:ticket.Email.value,
//       Course:ticket.Course.value
//     })
//      .then(response => response.data)
//   }