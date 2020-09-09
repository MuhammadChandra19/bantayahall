import React from 'react';
import { ConcertsModel } from '../../../domain/concert/interface';
import { Row, Col, Button } from 'antd';
import '../../styles/components/concertHolder.less';
import { toCurrency } from '../../../util/converter/currency';
import { toDateString } from '../../../util/converter/date';
import { Moment } from 'moment';

interface ConcertHolderInterface {
  concert: ConcertsModel;
  idx: number;
}
const ConcertHolder: React.FC<ConcertHolderInterface> = ({ concert, idx }) => {

  const convertDate = () => {
    const arrDate = toDateString(concert.concertDate, 'MMMM Do YYYY h:mm:ss a').split(" ")
    return arrDate
  }

  return (
    <div className='concert-holder' key={idx}>
      <Row>
        <Col xl={12} sm={6}>
          <img className="concert-holder--image" src={concert.image ? concert.image : '../image/ticket.jpg'} alt="ticket" />
        </Col>
        <Col xl={8} sm={12} style={{ padding: 5 }}>
          <div className="concert-holder--content">
            <div className="concert-holder--content--main">
              <h2>{concert.concertName}</h2>
              <h3>{concert.concertDesc}</h3>
            </div>
          </div>
        </Col>
        <Col xl={4}>
          <div className="concert-holder--date">
            <h1>{convertDate()[1]}</h1>
            <h3>{convertDate()[0]}</h3>
            <h2>{convertDate()[2]}</h2>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ConcertHolder;