export interface TicketInterface {
  id: number;
  concertId: number;
  ticketId: string;
  concertName: string;
  paymentId: number;
  userId: number;
}

export type PaymentType = 'GOPAY' | 'VA_BCA' | 'INDOMARET' | 'ALFAMART' | 'MANUAL'

export interface BuyTicketInterface {
  concertId: number;
  qty: number;
  pgwType: PaymentType;
  socketKey: string;
}