import React from 'react';
import { Carousel, Button } from 'antd';

import LandingLayout from '../views/Layout/LandingLayout';
import '../views/styles/pages/main.less'



const Home = () => {
  const contentStyle: React.CSSProperties = {
    color: 'black',
    lineHeight: '300px',
    textAlign: 'center',
    // background: '#364d79',
  };

  const getStarted = (
    <Button
      style={{
        marginTop: 10
      }}
      href="/register"
      type="primary">
      Get Started
    </Button>
  )
  return (
    <LandingLayout
      pageTitle="Stream on Bantayahall"
      description="Stream your favourite music on Bantayahall"
    >
      <section className="hero">
        <Carousel autoplay>
          <div className="container">
            <div className="main-message">
              <h3 style={contentStyle}>Experience the best Indonesia Music Comunity</h3>
              {getStarted}
              <div className="cta">
                <a href="#" className="btn"></a>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="main-message">
              <h3 style={contentStyle}>Sound lively and inspired. Experience emotions everyday</h3>
              {getStarted}
            </div>
          </div>
          <div className="container">
            <div className="main-message">
              <h3 style={contentStyle}>Find newest updates from your favourite musician</h3>
              {getStarted}
            </div>
          </div>
        </Carousel>
      </section>


    </LandingLayout>
  );
};

export default Home;