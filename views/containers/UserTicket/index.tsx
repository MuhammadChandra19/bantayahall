import { Button, Card, message, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useRouter } from 'next/router';
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
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)

  const populateModalByLiveStreamInfo = async (ticket: TicketInterface) => {
    setLoading(true)
    try {
      const data = await concertsService().getConcertById(ticket.concertId)
      const liveStream = await getLiveStreamById(ticket.concertId)
      setConcertData(data)
      setModalVisibility(true)
      setLiveAvailability(!!data && !!liveStream)
    } catch (e) {
      setError(true)
      console.log(e)
      message.error('Tidak dapat mengambil data untuk saat ini')
    } finally {
      setLoading(false)
    }
  }

  const watchNow = () => {
    const router = useRouter()
    router.push(`/stream/${concertData.concertId}?isLive=true`)
  }

  useEffect(() => {
    getUserTicketHistory()
  }, [])
  return (
    <>
      <Table<TicketInterface>
        columns={columns({
          openModal: populateModalByLiveStreamInfo,
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
          loading={isLoading}
        >
          <Card.Meta style={{ textAlign: 'center' }} title={concertData.concertName} description={concertData.concertDesc} />
        </Card>
        <Button disabled={!isLiveStreamAvailable} onClick={watchNow} style={{ width: '100%' }} type="primary">Nonton Sekarang</Button>
      </Modal>
    </>
  );
};

export default UserTicket;