import Layout from "../../views/Layout/MainLayout"
import { useEffect, useState } from "react"
import AppService from "../../domain/app/service"
import { RUNNING_LIVE_STREAM } from "../../domain/socket/redux/actions"
import { LiveStreamModel } from "../../domain/liveStream/interface"
import { useSelector } from "react-redux"
import { AppState } from "../../util/redux/store"
import { Card, Avatar } from "antd"
import { Dict } from "../../util/types"
import socketService from "../../domain/socket/service"
import { useRouter } from 'next/router'
const { Meta } = Card;

interface StreamProps {
  activeLiveStream: Dict<LiveStreamModel>
}

export const Stream = (): JSX.Element => {
  const { activeLiveStream } = useSelector<AppState, StreamProps>((state: AppState) => ({
    activeLiveStream: state.liveStream.activeLiveStream
  }))
  const router = useRouter()

  useEffect(() => {
    socketService()
  }, [activeLiveStream])



  const renderActiveLiveStream = (liveStreams: LiveStreamModel, idx: number) => {
    return (
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
    )
  }
  return (

    <Layout
      pageTitle="nyi roro wetan"
      description="this is only template"
    >
      {
        Object.values(activeLiveStream).length ?
          Object.values(activeLiveStream)
            .map(renderActiveLiveStream)
          : null
      }
    </Layout>
  )
}

export default Stream;
