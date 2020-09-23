import React, { useState } from 'react';
import { ConcertsModel } from '../../../domain/concert/interface';
import { Row, Col, Button } from 'antd';
import '../../styles/components/concertHolder.less';
import { toCurrency } from '../../../util/converter/currency';
import { toDateString } from '../../../util/converter/date';
import { Moment } from 'moment';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

interface ConcertHolderInterface {
  concert: ConcertsModel;
  idx: number;
}
const ConcertHolder: React.FC<ConcertHolderInterface> = ({ concert, idx }) => {

  const convertDate = () => {
    const arrDate = toDateString(concert.concertDate, 'MMM Do YYYY h:mm:ss a').split(" ")
    return arrDate
  }

  const convertPrice = () => {
    const stringifyPrice = concert.concertPrice.toString()
    const arrPrice = stringifyPrice.slice(0, stringifyPrice.length - 3);
    return `${arrPrice} K`;
  }

  return (
    <div className='concert-holder' key={idx}>
      <Row>
        <Col xl={20} sm={6}>
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
        <Col xl={4}>
          <div className="concert-holder--action">
            <h1 className="concert-holder--action--price">{convertPrice()}</h1>
            <img src="image/BNTHLL-LOGO-min.png" />
            <div className="concert-holder--action--button">
              <div className="ticket-action">
                <MinusCircleOutlined />
                <p>2</p>
                <PlusCircleOutlined />
              </div>
              <Button type="primary">Buy</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ConcertHolder;