import { TicketsAPI } from "../../../api/tickets";
import { BuyTicketInterface } from "../interface";

const ticketService = () => {
  const ticketAPI = new TicketsAPI();

  const getUserTicket = async (id: string, concertId: string): Promise<boolean> => {
    try {
      const { status } = await ticketAPI.getTicketById(id, concertId);
      return status
    } catch (e) {
      throw e;
    }
  }

  const buyConcertTicket = async (ticket: BuyTicketInterface): Promise<void> => {
    try {
      await ticketAPI.buyTickets(ticket);
    } catch (e) {
      throw e;
    }
  }

  return {
    getUserTicket,
    buyConcertTicket
  }
}

export default ticketService;