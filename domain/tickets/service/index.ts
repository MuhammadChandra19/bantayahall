import { TicketsAPI } from "../../../api/tickets";
import { baseService } from "../../common/service/base.service";
import { BuyTicketInterface } from "../interface";
import { SET_TICKET_LIST } from "../redux/actions";

const ticketService = () => {
  const { dispatch, setLoading } = baseService()
  const ticketAPI = new TicketsAPI();

  const getUserTicket = async (id: string, concertId: string): Promise<boolean> => {
    try {
      const { status } = await ticketAPI.getTicketById(id, concertId);
      return status
    } catch (e) {
      throw e;
    }
  }

  const getUserTicketHistory = async (): Promise<void> => {
    try {
      setLoading(SET_TICKET_LIST, true)
      const data = await ticketAPI.getHistoryTicket();
      dispatch(SET_TICKET_LIST, data)
    } catch (e) {
      throw e
    } finally {
      setLoading(SET_TICKET_LIST, false)
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
    buyConcertTicket,
    getUserTicketHistory
  }
}

export default ticketService;