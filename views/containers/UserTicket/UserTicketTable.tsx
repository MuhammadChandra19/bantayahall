import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { TicketInterface } from '../../../domain/tickets/interface'


interface ColumnFunction {
  openModal: (ticket: TicketInterface) => void;
  loading: boolean;
}
export const columns = ({ openModal, loading }: ColumnFunction): ColumnsType<TicketInterface> => [
  {
    key: 'ticketId',
    title: 'Concert ID',
    dataIndex: 'concertId'
  },
  {
    key: 'concertName',
    title: 'Concert',
    dataIndex: 'concertName',
    render: (text, data) => <Button type="primary" loading={loading} onClick={() => openModal(data)}>{text}</Button>
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
