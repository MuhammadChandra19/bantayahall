import Layout from "../../views/Layout/MainLayout"
import { useEffect, useState } from "react"
import AppService from "../../domain/app/service"

import { LiveStreamModel } from "../../domain/liveStream/interface"
import { useSelector } from "react-redux"
import { AppState } from "../../util/redux/store"
import { Card, Avatar, Row, Col } from "antd"
import { Dict } from "../../util/types"
// import socketService from "../../domain/socket/service"
import { useRouter } from 'next/router'
import { DUMMY } from "./dummy"
import liveStreamService from "../../domain/liveStream/service"

const { Meta } = Card;

interface StreamProps {
  activeLiveStream: Dict<LiveStreamModel>
}

export const Stream = (): JSX.Element => {
  const { getListOfActiveLiveStream } = liveStreamService()
  const { activeLiveStream } = useSelector<AppState, StreamProps>((state: AppState) => ({
    activeLiveStream: state.liveStream.activeLiveStream
  }))
  const router = useRouter()

  useEffect(() => {
    // socketService()
    getListOfActiveLiveStream()
  }, [])



  const renderActiveLiveStream = (liveStreams: LiveStreamModel, idx: number) => {
    return (
      <Col className="gutter-row" span={6}>
        <Card
          onClick={() => router.push(`/stream/${liveStreams.liveId}?isLive=true`)}
          key={idx}
          style={{ width: 300, cursor: 'pointer' }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={liveStreams.title}
            description="This is the description"
          />
        </Card>
      </Col>
    )
  }
  return (

    <Layout
      pageTitle="Bantayahall"
      description="live stream your favorite band"

    >
      <Row style={{ padding: 5 }} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {
          Object.values(activeLiveStream).length ?
            Object.values(activeLiveStream)
              .map(renderActiveLiveStream)
            : null
        }
      </Row>

    </Layout>
  )
}

export default Stream;
