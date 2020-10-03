import React, { useEffect, useState } from 'react';
import Layout from '../../views/Layout/MainLayout';
import concertsService from '../../domain/concert/service';
import { ConcertsModel } from '../../domain/concert/interface';
import ConcertHolder from '../../views/containers/ConcertHolder';
import { Row, Col, Modal } from 'antd';
import { AppState } from '../../util/redux/store';
import { useSelector } from 'react-redux';
import { Dict } from '../../util/types';
import ticketService from '../../domain/tickets/service';
import PaymentModal from '../../views/containers/PaymentModal';


const { confirm } = Modal
const Upcoming = () => {
  const { getListConcerts, updateCountTicket } = concertsService();
  const { buyConcertTicket } = ticketService()
  const [paymentVisible, setPaymentvisibility] = useState(false)
  const dataConcerts = useSelector<AppState, Dict<ConcertsModel>>(state => state.concert.availableConcerts)


  const loadDataConcerts = async () => {
    await getListConcerts({ page: 0, size: 20 });
  }

  const buyTicketConfirmation = (concertId: number, qty: number) => {
    // confirm({
    //   title: 'Ticket Confirmation',
    //   icon: <img
    //     style={{
    //       float: 'left',
    //       width: 20,
    //       margin: 'auto',
    //       WebkitFilter: 'grayscale(100%)',
    //       filter: 'grayscale(100%)'
    //     }}
    //     src="image/BNTHLL-LOGO-min.png"
    //   />,
    //   content: <p style={{ marginLeft: 20 }}>proceed to buy {qty} {qty > 1 ? 'tickets' : 'ticket'}?</p>,
    //   async onOk() {
    //     return buyConcertTicket({ concertId, qty })
    //       .then(() => {
    //         Modal.success({
    //           title: `Success buy ${qty > 1 ? 'tickets' : 'ticket'}`,
    //           content: 'Please check your email to confirm your payment'
    //         })
    //       })
    //   }
    // })
    setPaymentvisibility(true)
  }

  useEffect(() => {
    loadDataConcerts()
  }, [])

  const concertHolder = (concert: ConcertsModel, idx: number) => {
    return (
      <Col key={`concert-holder-${idx}`} xl={12} sm={24}>
        <ConcertHolder
          concert={concert}
          idx={idx}
          onConfirmationBuying={buyTicketConfirmation}

          onDecrementIcrementTicket={updateCountTicket}
        />
      </Col>

    )
  }
  return (
    <Layout
      pageTitle="Bantayahall - Upcoming Event"
      description="Buy your favorite band ticket"

    >
      <Row gutter={[8, 8]}>
        {
          Object.values(dataConcerts).map(concertHolder)
        }
      </Row>
      <PaymentModal visible={paymentVisible} onClose={() => setPaymentvisibility(false)} />
    </Layout>
  );
};

export default Upcoming;