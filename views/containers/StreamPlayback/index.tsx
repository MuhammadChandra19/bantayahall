import React, { useRef, useState, useEffect } from 'react';
import '../../styles/containers/videoPlayer.less';
import flv from "flv.js";
import { AppConfig } from '../../../constant/app';
import { AppState } from '../../../util/redux/store';
import { UserModel } from '../../../domain/user/model';
import { useSelector } from 'react-redux';
import { LiveStreamModel } from '../../../domain/liveStream/interface';
import { SET_ACTIVE_LIVE_STREAM } from '../../../domain/liveStream/redux/actions';
import liveStreamService from '../../../domain/liveStream/service';
import { Skeleton, message, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

interface StreamPlaybackProps {
  isLive: boolean,
  mediaId: string | string[],
  readyToPlay: boolean;
}

interface StreamStateProps {
  userdata: UserModel;
  isLoading: boolean;
  liveStreamData: LiveStreamModel;
}
const StreamPlayback: React.FC<StreamPlaybackProps> = ({ isLive, mediaId, readyToPlay }) => {
  const { userdata, isLoading, liveStreamData } = useSelector<AppState, StreamStateProps>((state: AppState) => ({
    userdata: state.user.user,
    isLoading: state.common.loading[SET_ACTIVE_LIVE_STREAM],
    liveStreamData: state.liveStream.liveData
  }))
  const [flvPlayer, setFlvPlayer] = useState(null)
  const liveUrl = `${AppConfig.MEDIA_SERVER}live/${mediaId}.flv`;
  const videoElement = useRef<HTMLVideoElement>(null);
  const { getLiveStreamById } = liveStreamService();


  const initLiveStream = (video: HTMLVideoElement) => {
    if (video && isLive) {
      var flvPlayer = flv.createPlayer({
        type: 'flv',
        url: liveUrl
      });
      flvPlayer.attachMediaElement(video);
      flvPlayer.load();
      flvPlayer.play();
      setFlvPlayer(flvPlayer)
    }
  }

  const checkTicket = async () => {
    try {
      initLiveStream(videoElement.current);
      getLiveStreamById(mediaId as string);
    } catch (e) {
      message.error('Something happend with the server.')
    }

  }

  useEffect(() => {
    checkTicket()
    return () => {
      if (flvPlayer) {
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
      }
    }
  }, [])

  return (
    isLoading || !readyToPlay ?
      (
        <Result
          icon={<SmileOutlined />}
          title="Please wait, we're preparing your videos"
        />
      ) :
      (
        <div className="live-container">
          <div className="video-container">
            <video
              autoPlay
              className="video-player "
              ref={videoElement}
              id="video-player"
              controls
            />
            <div style={{ margin: '10px' }}>
              <Skeleton loading={isLoading}>
                <div>
                  <h4 style={{ color: 'white', fontSize: 17 }}>{liveStreamData?.title}</h4>
                  <p style={{ color: 'white' }}>
                    {liveStreamData?.description}
                  </p>
                </div>
              </Skeleton>
            </div>

          </div>
        </div>
      )

  );
};

export default StreamPlayback;