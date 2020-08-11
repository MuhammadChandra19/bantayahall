import React, { useRef, useState, useEffect } from 'react';
import { PlayCircleFilled, PauseCircleFilled, SoundFilled, ExpandOutlined } from '@ant-design/icons';
import '../../styles/containers/videoPlayer.less';
import flv from "flv.js";
import { ENTER_LIVE_ROOM, LIVE_STREAM_AUDIENCE } from '../../../domain/socket/redux/actions';
interface StreamPlaybackProps {
  isLive: boolean,
  mediaId: string | string[]
}
const StreamPlayback: React.FC<StreamPlaybackProps> = ({ isLive, mediaId }) => {
  const videoPlayer = useRef<HTMLVideoElement>(null);
  const videoIndicator = useRef<HTMLDivElement>(null);
  const [isPlayed, setIsPlayed] = useState(true);
  const liveUrl = `http://localhost:8000/live/${mediaId}.flv`;

  const initLiveStream = (video: HTMLVideoElement) => {
    if (video && isLive) {
      var flvPlayer = flv.createPlayer({
        type: 'flv',
        url: liveUrl
      });
      flvPlayer.attachMediaElement(video);
      flvPlayer.load();
      flvPlayer.play();
    }
  }

  return (
    <div className="live-container">
      <div className="video-container">
        <video
          autoPlay
          ref={initLiveStream}
          className="video-player"
          id="video-player"

        />
      </div>
      <div className={`control-container ${isPlayed ? 'played' : ''}`}>
        <div
          className="control-container__bar"
        >
          <div
            ref={videoIndicator}
            id="video-indicator"
            className="control-container__bar-indcator"
          >
          </div>
        </div>
        <div className="control-container__actions">
          <div className="control-container__actions_left">
            {
              !isPlayed ?
                <PlayCircleFilled />
                : <PauseCircleFilled />
            }
            <div className="control-container__actions_left-volume">
              <SoundFilled />

            </div>
          </div>
          <div className="control-container__actions_right">
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamPlayback;