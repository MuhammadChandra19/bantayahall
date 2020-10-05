import { Button, Card, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ConcertsModel } from '../../../domain/concert/interface';
import concertsService from '../../../domain/concert/service';
import { SET_LIVE_STREAM_DATA } from '../../../domain/liveStream/redux/actions';
import liveStreamService from '../../../domain/liveStream/service';
import { TicketInterface } from '../../../domain/tickets/interface';
import { SET_TICKET_LIST } from '../../../domain/tickets/redux/actions';
import ticketService from '../../../domain/tickets/service';
import { AppState } from '../../../util/redux/store';
import { columns } from './UserTicketTable'

interface UserTicketState {
  history: Array<TicketInterface>
  isLaodingHistory: boolean
  isLoadingLiveStreamData: boolean
}
const UserTicket = () => {
  const { history, isLaodingHistory, isLoadingLiveStreamData } = useSelector<AppState, UserTicketState>(state => ({
    history: state.ticket.ticketHistory,
    isLaodingHistory: state.common.loading[SET_TICKET_LIST],
    isLoadingLiveStreamData: state.common.loading[SET_LIVE_STREAM_DATA]
  }))
  const { getUserTicketHistory } = ticketService()
  const { getLiveStreamById } = liveStreamService()
  const [isVisible, setModalVisibility] = useState(false)
  const [concertData, setConcertData] = useState({} as ConcertsModel)
  const [isLiveStreamAvailable, setLiveAvailability] = useState(false)

  const populateModalByLiveStreamInfo = async (ticket: TicketInterface) => {
    try {
      const data = await concertsService().getConcertById(ticket.concertId)
      console.log(data)
      // const data = await getLiveStreamById(ticket.concertId);
      // setLiveAvailability(Object.keys(data).length > 0)
      setConcertData(data)
      setModalVisibility(true)
    } catch {

    } finally {

    }
  }
  useEffect(() => {
    getUserTicketHistory()
  }, [])
  return (
    <>
      <Table<TicketInterface>
        columns={columns({
          openModal: populateModalByLiveStreamInfo,
          loading: isLoadingLiveStreamData
        })}
        rowKey='ticketId'
        dataSource={history}
        pagination={false}
        loading={isLaodingHistory}
      />
      <Modal
        visible={isVisible}
        footer={null}
        bodyStyle={{ padding: 0 }}
        onCancel={() => setModalVisibility(false)}

      >
        <Card
          style={{ width: '100%' }}
          cover={<img src="../image/ticket.jpg" />}
        >
          <Card.Meta style={{ textAlign: 'center' }} title={concertData.concertName} description={concertData.concertDesc} />
        </Card>
        <Button disabled={isLiveStreamAvailable} style={{ width: '100%' }} type="primary">Nonton Sekarang</Button>
      </Modal>
    </>
  );
};

export default UserTicket;