import { TicketsAPI } from "../../../api/tickets";

const ticketService = () => {
  const ticketAPI = new TicketsAPI();

  const getUserTicket = async (id: string): Promise<boolean> => {
    try {
      const { status } = await ticketAPI.getTicketById(id);
      return status
    } catch (e) {
      throw e;
    }
  }

  return {
    getUserTicket
  }
}

export default ticketService;