import React, { useRef, useState, useEffect } from 'react';
import { PlayCircleFilled, PauseCircleFilled, SoundFilled, ExpandOutlined } from '@ant-design/icons';
import '../../styles/containers/videoPlayer.less';
import flv from "flv.js";
import videojs, { VideoJsPlayerOptions, VideoJsPlayer } from 'video.js'
import { AppConfig } from '../../../constant/app';

interface StreamPlaybackProps {
  isLive: boolean,
  mediaId: string | string[]
}
const StreamPlayback: React.FC<StreamPlaybackProps> = ({ isLive, mediaId }) => {
  const videoIndicator = useRef<HTMLDivElement>(null);
  const [videoJSplayer, setVideoJSplayer] = useState(null as VideoJsPlayer)
  const [isPlayed, setIsPlayed] = useState(true);
  const liveUrl = `${AppConfig.MEDIA_SERVER}/live/${mediaId}/index.m3u8`;

  const initLiveStream = (video: HTMLVideoElement) => {
    if (video && isLive) {
      const videoJsOptions: VideoJsPlayerOptions = {
        autoplay: true,
        controls: true,
        sources: [{
          src: liveUrl,
          type: 'application/x-mpegURL',
        }],
        fluid: true
      }
      setVideoJSplayer(videojs(video, videoJsOptions, () => {
        console.log('onPlayerReady', 'ready')
      }))
    }
  }

  useEffect(() => {

    return () => {
      videoJSplayer.dispose()
    }
  }, [])

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
        <div data-vjs-player>
          <video ref={initLiveStream} className="video-js vjs-big-play-centered" />
        </div>
      </div>
    </div>
    // <div className="live-container">
    //   <div className="video-container" data-vjs-player>
    //     <video
    //       autoPlay
    //       ref={initLiveStream}
    //       id="video-player"

    //     />
    //   </div>
    //   <div className={`control-container ${isPlayed ? 'played' : ''}`}>
    //     <div
    //       className="control-container__bar"
    //     >
    //       <div
    //         ref={videoIndicator}
    //         id="video-indicator"
    //         className="control-container__bar-indcator"
    //       >
    //       </div>
    //     </div>
    //     <div className="control-container__actions">
    //       <div className="control-container__actions_left">
    //         {
    //           !isPlayed ?
    //             <PlayCircleFilled />
    //             : <PauseCircleFilled />
    //         }
    //         <div className="control-container__actions_left-volume">
    //           <SoundFilled />

    //         </div>
    //       </div>
    //       <div className="control-container__actions_right">
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default StreamPlayback;