import React, { useState } from 'react';
import { ConcertsModel } from '../../../domain/concert/interface';
import { Row, Col, Button, message, Drawer } from 'antd';
import '../../styles/components/concertHolder.less';
import { toDateString } from '../../../util/converter/date';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { AppState } from '../../../util/redux/store';
import { BuyTicketInterface } from '../../../domain/tickets/interface';

interface ConcertHolderInterface {
  concert: ConcertsModel;
  idx: number;
  onDecrementIcrementTicket: (id: number, count: number) => void
  onConfirmationBuying: (id: number, qty: number, price: number) => void
  loading: boolean
}
const ConcertHolder: React.FC<ConcertHolderInterface> = ({ concert, idx, onDecrementIcrementTicket, onConfirmationBuying, loading }) => {
  const ticket = useSelector<AppState, number>(state => state.concert.availableConcerts[concert.concertId].count)
  const [initialCount, _] = useState(concert.count)
  const [isDrawerVisible, showDrawer] = useState(false)
  const convertDate = () => {
    const arrDate = toDateString(concert.concertDate, 'MMM Do YYYY h:mm:ss a').split(" ")
    return arrDate
  }

  const convertPrice = () => {
    const stringifyPrice = concert.concertPrice.toString()
    const arrPrice = stringifyPrice.slice(0, stringifyPrice.length - 3);
    return `${arrPrice} K`;
  }


  const updateTicketCount = (isIncrement: boolean) => {
    if (isIncrement) {
      onDecrementIcrementTicket(concert.concertId, concert.count++)
    } else {
      if (concert.count > 0 && concert.count > initialCount) {
        onDecrementIcrementTicket(concert.concertId, concert.count--)
      }

    }
  }

  const checkInnerWidth = () => {
    console.log("klik")
    if (window.innerWidth < 768) {
      showDrawer(true)
    }
  }

  return (
    <>
      <div className='concert-holder' key={idx} onClick={checkInnerWidth} >
        <Row>
          <Col xs={24} sm={24} md={20} lg={20}>
            <img className="concert-holder--image" src={concert.image ? concert.image : '../image/ticket.jpg'} alt="ticket" />
            <div className="concert-holder--content">
              <div className="concert-holder--content--main">
                <h2>{concert.concertName}</h2>
                <h3>{concert.concertDesc}</h3>
              </div>
              <div className="concert-holder--content--date">
                <h1>{convertDate()[1]}</h1>
                <h3>{convertDate()[0]}</h3>
                <h2>{convertDate()[2]}</h2>
              </div>

            </div>
            <Button type="primary" className="btn-buy" >Beli tiket</Button>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <div className="concert-holder--action">
              <h1 className="concert-holder--action--price">{convertPrice()}</h1>
              <img src="image/BNTHLL-LOGO-min.png" />
              <div className="concert-holder--action--button">
                <div className="ticket-action">
                  <MinusCircleOutlined
                    onClick={() => updateTicketCount(false)}
                  />
                  <p>{ticket}</p>
                  <PlusCircleOutlined
                    onClick={() => updateTicketCount(true)}
                  />
                </div>
                <Button
                  onClick={() => onConfirmationBuying(concert.concertId, ticket - initialCount, concert.concertPrice)}
                  type="primary"
                  loading={loading}
                  disabled={ticket - initialCount === 0}
                >Buy</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Drawer
        height={180}
        drawerStyle={{ padding: 0 }}
        placement="bottom"
        closable={false}
        onClose={() => showDrawer(!isDrawerVisible)}
        visible={isDrawerVisible}
        key="bottom"
        className="drawer-upcoming"
      >
        <div style={{ padding: 15, display: 'grid' }}>
          <h1 style={{ marginBottom: 0 }}>{concert.concertName}</h1>
          <h2 style={{ marginBottom: 0 }}> {convertPrice()}</h2>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MinusCircleOutlined
              style={{ margin: 'auto' }}
              onClick={() => updateTicketCount(false)}
            />
            <p style={{ margin: 'auto' }}>{ticket}</p>
            <PlusCircleOutlined
              style={{ margin: 'auto' }}
              onClick={() => updateTicketCount(true)}
            />
          </div>

        </div>
        <Button

          onClick={() => onConfirmationBuying(concert.concertId, ticket - initialCount, concert.concertPrice)}
          type="primary"
          style={{ width: '100%' }}
          loading={loading}
          disabled={ticket - initialCount === 0}
        >Pilih metode pembayaran</Button>
        {/* <div className="">
          <h1 className="">{convertPrice()}</h1>
          <div className="">
            <div >
              <MinusCircleOutlined
                onClick={() => updateTicketCount(false)}
              />
              <p>{ticket}</p>
              <PlusCircleOutlined
                onClick={() => updateTicketCount(true)}
              />
            </div>
            <Button
              onClick={() => onConfirmationBuying(concert.concertId, ticket - initialCount, concert.concertPrice)}
              type="primary"
              loading={loading}
              disabled={ticket - initialCount === 0}
            >Buy</Button>
          </div>
        </div> */}
      </Drawer>
    </>
  );
};

export default ConcertHolder;