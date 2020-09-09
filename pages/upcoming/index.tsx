import React, { useEffect, useState } from 'react';
import Layout from '../../views/Layout/MainLayout';
import concertsService from '../../domain/concert/service';
import { ConcertsModel } from '../../domain/concert/interface';
import ConcertHolder from '../../views/components/ConcertHolder';
import { Row, Col } from 'antd';


const Upcoming = () => {
  const { getListConcerts } = concertsService();
  const [dataConcerts, setData] = useState([])

  const loadDataConcerts = async () => {
    const data = await getListConcerts({ page: 0, size: 10 });
    setData(data)
  }

  useEffect(() => {
    loadDataConcerts()
  }, [])

  const concertHolder = (concert: ConcertsModel, idx: number) => {
    return (
      <Col xl={12} sm={24}>
        <ConcertHolder
          concert={concert}
          idx={idx}
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
          dataConcerts.map(concertHolder)
        }
      </Row>
    </Layout>
  );
};

export default Upcoming;