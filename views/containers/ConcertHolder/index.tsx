import React, { useState } from 'react';
import { ConcertsModel } from '../../../domain/concert/interface';
import { Row, Col, Button, message } from 'antd';
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
  onConfirmationBuying: (id: number, qty: number) => void
}
const ConcertHolder: React.FC<ConcertHolderInterface> = ({ concert, idx, onDecrementIcrementTicket, onConfirmationBuying }) => {
  const ticket = useSelector<AppState, number>(state => state.concert.availableConcerts[concert.concertId].count)
  const [initialCount, _] = useState(concert.count)
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

  return (
    <div className='concert-holder' key={idx}>
      <Row>
        <Col span={20}>
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
        </Col>
        <Col span={4}>
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
                onClick={() => onConfirmationBuying(concert.concertId, ticket - initialCount)}
                type="primary"
                disabled={ticket - initialCount === 0}
              >Buy</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ConcertHolder;