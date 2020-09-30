import { Table } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TicketInterface } from '../../../domain/tickets/interface';
import { SET_TICKET_LIST } from '../../../domain/tickets/redux/actions';
import ticketService from '../../../domain/tickets/service';
import { AppState } from '../../../util/redux/store';
import { columns } from './UserTicketTable'

interface UserTicketState {
  history: Array<TicketInterface>
  isLoading: boolean
}
const UserTicket = () => {
  const { history, isLoading } = useSelector<AppState, UserTicketState>(state => ({
    history: state.ticket.ticketHistory,
    isLoading: state.common.loading[SET_TICKET_LIST]
  }))
  const { getUserTicketHistory } = ticketService()

  useEffect(() => {
    getUserTicketHistory()
  }, [])
  return (
    <Table<TicketInterface>
      columns={columns}
      dataSource={history}
      pagination={false}
      loading={isLoading}
    />
  );
};

export default UserTicket;