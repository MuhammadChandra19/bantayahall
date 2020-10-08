import React, { useEffect, useState } from 'react';
import Layout from '../../views/Layout/MainLayout';
import concertsService from '../../domain/concert/service';
import { ConcertsModel } from '../../domain/concert/interface';
import ConcertHolder from '../../views/containers/ConcertHolder';
import { Row, Col, notification, message } from 'antd';
import { AppState } from '../../util/redux/store';
import { useSelector } from 'react-redux';
import { Dict } from '../../util/types';
import PaymentModal from '../../views/containers/PaymentModal';
import socketService from '../../domain/socket/service';
import ticketService from '../../domain/tickets/service';
import { BuyTicketInterface, PaymentType } from '../../domain/tickets/interface';


const Upcoming = () => {
  const { getListConcerts, updateCountTicket } = concertsService();
  const { generatePaymentMethods } = ticketService()
  const [paymentVisible, setPaymentvisibility] = useState(false)
  const dataConcerts = useSelector<AppState, Dict<ConcertsModel>>(state => state.concert.availableConcerts)
  const [socketId, setSocketId] = useState('')
  const [objTicket, setObjTicket] = useState(null as BuyTicketInterface)
  const [gopayQr, setGopayQr] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [ticketPrice, setPrice] = useState(0)
  const loadDataConcerts = async () => {
    await getListConcerts({ page: 0, size: 20 });
  }

  const buyTicketConfirmation = async (id: number, qty: number, price: number) => {
    const ticket: BuyTicketInterface = { concertId: id, pgwType: null, qty, socketKey: socketId }
    setObjTicket(ticket)
    setPaymentvisibility(true)
    setPrice(price)
  }

  const buyTicket = async (pgwType: PaymentType) => {
    try {
      setLoading(true)
      setError(false)
      const ticket: BuyTicketInterface = { concertId: objTicket.concertId, pgwType, qty: objTicket.qty, socketKey: socketId }
      const data = await generatePaymentMethods(ticket)
      if (pgwType === 'GOPAY') {
        setGopayQr(data.actions[0].url)
      } else if (pgwType === "MANUAL") {
        message.success('Pembayaran berhasil, mohon check email anda untuk melakukan konfirmasi')
      }
    } catch (e) {
      setError(true)
      message.error('Terjadi kesalahan, mohon coba kembali')
    } finally {
      setLoading(false)
      if (pgwType === "MANUAL") {
        setPaymentvisibility(false)
      }
    }
  }

  useEffect(() => {
    loadDataConcerts()
    const { socket } = socketService();
    socket.on("PAYMENT_PUSH", ({ _, message }) => {
      notification.success({
        message: 'Success',
        description: message
      })
      setPaymentvisibility(false)
    })
    socket.on('connect', () => {
      setSocketId(socket.id)
    })
    return () => {
      console.log('emit')
      socket.disconnect()
    }
  }, [])

  const concertHolder = (concert: ConcertsModel, idx: number) => {
    return (
      <Col key={`concert-holder-${idx}`} xl={12} sm={24}>
        <ConcertHolder
          concert={concert}
          idx={idx}
          loading={isLoading}
          onConfirmationBuying={buyTicketConfirmation}

          onDecrementIcrementTicket={updateCountTicket}
        />
      </Col>

    )
  }
  return (
    <Layout
      pageTitle="Bantayahall - Upcoming Event"
      description="Event yang akan datang di Bantayahall"

    >
      <Row gutter={[8, 8]}>
        {
          Object.values(dataConcerts).map(concertHolder)
        }
      </Row>
      {
        paymentVisible && (
          <PaymentModal
            hasError={isError}
            qty={objTicket.qty}
            gopayQr={gopayQr}
            visible={paymentVisible}
            onProceed={buyTicket}
            loading={isLoading}
            onClose={() => {
              setGopayQr(null)
              setPaymentvisibility(false)
            }

            }
            price={ticketPrice}
          />
        )
      }

    </Layout>
  );
};

export default Upcoming;