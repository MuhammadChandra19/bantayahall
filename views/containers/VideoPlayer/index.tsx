import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import '../../styles/containers/videoPlayer.less';
// import { PlayCircleFilled, PauseCircleFilled, SoundFilled, ExpandOutlined } from '@ant-design/icons';
import LiveConfirmation from '../LiveConfirmation';

interface VideoPlayerProps {
  src?: string;
  isLive?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src = "/video/mov_bbb.mp4",
  isLive = false
}) => {
  // const [isPlayed, setIsPlayed] = useState(false);
  const [isLiveStarted, setStartLive] = useState(false);
  const videoPlayer = useRef<HTMLVideoElement>(null);
  // const videoIndicator = useRef<HTMLDivElement>(null);

  const startStopVideo = () => {
    if (videoPlayer.current.paused) {
      // setIsPlayed(true);
      videoPlayer.current.play();

    } else {
      // setIsPlayed(false);
      videoPlayer.current.pause();
    }
  }

  // const videoTimeUpdate = () => {
  //   var indicatorPosition = videoPlayer.current.currentTime / videoPlayer.current.duration;
  //   videoIndicator.current.style.width = indicatorPosition * 100 + '%';
  //   if (videoPlayer.current.ended) {
  //     setIsPlayed(false);
  //   }
  // }

  // const changeVolume = (vol: number) => {
  //   videoPlayer.current.volume = vol;
  // }

  // const openFullscreen = () => {
  //   const elem = videoPlayer.current;
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   }
  // }

  // const changeVideoCurrentTime = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   const pageWidth = window.outerWidth
  //   const indicatorWidth = event.currentTarget.clientWidth;
  //   const selectedTimePosition = event.clientX;
  //   const selectedDecimal = (selectedTimePosition - (pageWidth - indicatorWidth)) / indicatorWidth;
  //   videoIndicator.current.style.width = selectedDecimal * 100 + '%';
  //   videoPlayer.current.currentTime = selectedDecimal * videoPlayer.current.duration;

  // }

  const recordLocalStream = (element: HTMLVideoElement) => {
    const peerConnection = new RTCPeerConnection();
    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        if (element) {
          element.srcObject = stream;
        }

        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
      },
      error => {
        console.warn(error.message);
      });
  }

  useEffect(() => {
    recordLocalStream(videoPlayer.current);
  }, [])

  return (
    <div className="live-container" >
      <div className="video-container">
        <video
          // onClick={startStopVideo}
          // onTimeUpdate={videoTimeUpdate}
          autoPlay
          ref={videoPlayer}
          className={`video-player ${isLiveStarted ? '' : 'gray'}`}
          id="video-player"
          // width="560"
          muted
        />
      </div>
      <LiveConfirmation isLiveStarted={isLiveStarted} liveNow={() => setStartLive(true)} />
      {/* <div className={`control-container ${isPlayed ? 'played' : ''}`}>
        <div className="control-container__bar" onClick={changeVideoCurrentTime}>
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
                <PlayCircleFilled onClick={startStopVideo} />
                : <PauseCircleFilled onClick={startStopVideo} />
            }
            <div className="control-container__actions_left-volume">
              <SoundFilled />
              <Slider
                tooltipVisible={false}
                min={0}
                max={1}
                onChange={changeVolume}
                step={0.01}
              />
            </div>
          </div>
          <div className="control-container__actions_right">
            <ExpandOutlined onClick={openFullscreen} />
          </div>


        </div>
      </div> */}

    </div>
  );
};

export default VideoPlayer;