import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import '../../styles/containers/videoPlayer.less';
// import { PlayCircleFilled, PauseCircleFilled, SoundFilled, ExpandOutlined } from '@ant-design/icons';
import LiveConfirmation from '../LiveConfirmation';
import { Button, Input } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { Timer } from '../../../util/time/timer';

// import { PlayCircleFilled, PauseCircleFilled, SoundFilled } from '@ant-design/icons';
// import { Slider } from 'antd';

interface VideoPlayerProps {
  src?: string;
  isLive?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src = "/video/mov_bbb.mp4",
  isLive = false
}) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [isLiveStarted, setStartLive] = useState(false);
  const [liveIsEndded, setLiveIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoPlayer = useRef<HTMLVideoElement>(null);
  const timeInput = useRef<Input>(null);

  // const videoIndicator = useRef<HTMLDivElement>(null);

  const startStopVideo = () => {
    if (videoPlayer.current.paused) {
      setIsPlayed(true);
      videoPlayer.current.play();

    } else {
      setIsPlayed(false);
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

  const endLiveStream = () => {
    setStartLive(false);
    setLiveIsEnded(true);
  }

  const startLiveStream = () => {
    let timer = new Timer(timeInput.current)
    timer.start();
    setStartLive(true);
  }


  const recordLocalStream = (element: HTMLVideoElement) => {
    const peerConnection = new RTCPeerConnection();
    navigator.getUserMedia(
      { video: true, audio: isMuted },
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
  }, [isMuted])

  return (
    <div className="live-container" >
      <div className="video-container">
        <video
          autoPlay
          ref={videoPlayer}
          className={`video-player ${isLiveStarted ? '' : 'gray'}`}
          id="video-player"
          muted
        />
      </div>
      <LiveConfirmation
        isVisible={!liveIsEndded && !isLiveStarted}
        liveNow={startLiveStream}
      />
      <div
        className="live-info"
        style={{ display: `${isLiveStarted ? 'flex' : 'none'}` }}
      >
        <div className="live-info__item" >
          <Input
            addonBefore="LIVE"

            ref={timeInput}
            style={{ width: 120 }}
          />
        </div>
      </div>
      <div className={`control-container ${isLiveStarted ? 'played' : ''}`}>
        {/* <div
          className="control-container__bar"
        // onClick={changeVideoCurrentTime}
        >
          <div
            ref={videoIndicator}
            id="video-indicator"
            className="control-container__bar-indcator"

          >

          </div>
        </div> */}
        <div className="control-container__actions">
          {
            !isMuted ?
              <AudioOutlined onClick={() => setIsMuted(true)} />
              : <AudioMutedOutlined onClick={() => setIsMuted(false)} />
          }

          <Button
            type="primary"
            onClick={endLiveStream}
          >
            End Live
          </Button>
        </div>
      </div>

    </div>
  );
};

export default VideoPlayer;