export interface TicketInterface {
  id: number;
  concertId: number;
  ticketId: string;
  paymentId: number;
  userId: number;
}

export interface BuyTicketInterface {
  concertId?: number;
  qty?: number;
}