import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { TicketInterface } from '../../../domain/tickets/interface'

export const columns: ColumnsType<TicketInterface> = [
  {
    key: 'concertId',
    title: 'Concert ID',
    dataIndex: 'concertId'
  },
  {
    key: 'ticketId',
    title: 'Ticket ID',
    dataIndex: 'ticketId'
  },
  {
    key: 'paymentId',
    title: 'Payment ID',
    dataIndex: 'paymentId'
  },
]
