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
import { SET_USER_DATA } from '../../../domain/user/redux/actions';
import Chat from '../Chat';

interface StreamPlaybackProps {
  isLive: boolean,
  mediaId: string | string[],
  readyToPlay: boolean;
}

interface StreamStateProps {
  userdata: UserModel;
  isLoading: boolean;
  liveStreamData: LiveStreamModel;
  loadingUserData: boolean
}
const StreamPlayback: React.FC<StreamPlaybackProps> = ({ isLive, mediaId, readyToPlay }) => {
  const { userdata, isLoading, liveStreamData, loadingUserData } = useSelector<AppState, StreamStateProps>((state: AppState) => ({
    userdata: state.user.user,
    loadingUserData: state.common.loading[SET_USER_DATA],
    isLoading: state.common.loading[SET_ACTIVE_LIVE_STREAM],
    liveStreamData: state.liveStream.liveData
  }))
  const [flvPlayer, setFlvPlayer] = useState(null)
  const liveUrl = `${AppConfig.MEDIA_SERVER}live/${mediaId}.flv`;
  const videoElement = useRef<HTMLVideoElement>(null);
  const { getLiveStreamById } = liveStreamService();
  const [isFullScreen, setFullScreen] = useState(false)


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
    const pref = ["", "webkit", "moz", "ms"]
    pref.forEach(
      prefix => document.addEventListener(prefix + "fullscreenchange", () => {
        setFullScreen(!isFullScreen)
      }, false)
    );
    return () => {
      if (flvPlayer) {
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
      }
    }
  }, [])

  const chatSection = () => {
    return !loadingUserData ?
      <Chat
        isFullScreen={isFullScreen}
        roomId={mediaId as string}
        userData={userdata}
      /> : null
  }

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
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ color: 'white', fontSize: 17 }}>{liveStreamData?.title}</h4>
                    // <h4 style={{ color: 'white', fontSize: 17 }}>0 views</h4>
                  </div>
                  <p style={{ color: 'white' }}>
                    {liveStreamData?.description}
                  </p>
                </div>
              </Skeleton>
            </div >
            <div>
              {
                chatSection()
              }
            </div>
          </div>
        </div>
      )

  );
};

export default StreamPlayback;