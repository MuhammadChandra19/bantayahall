import React, { useRef, useState, useEffect } from 'react';
import '../../styles/containers/videoPlayer.less';
import flv from "flv.js";
import { AppConfig } from '../../../constant/app';

interface StreamPlaybackProps {
  isLive: boolean,
  mediaId: string | string[]
}
const StreamPlayback: React.FC<StreamPlaybackProps> = ({ isLive, mediaId }) => {
  const [flvPlayer, setFlvPlayer] = useState(null)
  const liveUrl = `${AppConfig.MEDIA_SERVER}live/${mediaId}.flv`;

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

  useEffect(() => {

    return () => {
      if (flvPlayer) {
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
      }
    }
  }, [])

  return (
    <div className="live-container">
      <div className="video-container">
        <video
          autoPlay
          className="video-player "
          ref={initLiveStream}
          id="video-player"
          controls

        />
      </div>
    </div>
  );
};

export default StreamPlayback;