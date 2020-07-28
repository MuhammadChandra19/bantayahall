import React, { useRef, useState } from 'react';
import { PlayCircleFilled, PauseCircleFilled, SoundFilled, ExpandOutlined } from '@ant-design/icons';
import '../../styles/containers/videoPlayer.less';

const StreamPlayback = () => {
  const videoPlayer = useRef<HTMLVideoElement>(null);
  const videoIndicator = useRef<HTMLDivElement>(null);
  const [isPlayed, setIsPlayed] = useState(false);

  return (
    <div className="live-container">
      <div className="video-container">
        <video
          autoPlay
          ref={videoPlayer}
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