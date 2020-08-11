import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect
} from 'react';
import '../../styles/containers/videoPlayer.less';
// import { PlayCircleFilled, PauseCircleFilled, SoundFilled, ExpandOutlined } from '@ant-design/icons';
import LiveConfirmation from '../LiveConfirmation';
import { Button, Input } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { Timer } from '../../../util/time/timer';
import socketService from '../../../domain/socket/service';
import { LIVE_STREAM_HOST, LIVE_STREAM_AUDIENCE } from '../../../domain/socket/redux/actions';
import { AppState } from '../../../util/redux/store';
import SocketStream from "socket.io-stream"
import { useSelector } from 'react-redux';
import { LiveStreamModel } from '../../../domain/liveStream/interface';

// import { PlayCircleFilled, PauseCircleFilled, SoundFilled } from '@ant-design/icons';
// import { Slider } from 'antd';

interface VideoPlayerProps {
  src?: string;
  isLive?: boolean;
}

interface LiveData {
  liveData: LiveStreamModel
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src = "/video/mov_bbb.mp4",
  isLive = false,
}) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const [isLiveStarted, setStartLive] = useState(false);
  const [liveIsEndded, setLiveIsEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoPlayer = useRef<HTMLVideoElement>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D;
  const timeInput = useRef<Input>(null);
  const { socket } = socketService()

  const { liveData } = useSelector<AppState, LiveData>((state) => ({
    liveData: state.liveStream.liveData
  }))

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

  const startLive = () => {
    let timer = new Timer(timeInput.current)
    timer.start();
    setInterval(() => {
      setStartLive(true);
    }, 500)


  }
  const recordLocalStream = (element: HTMLVideoElement) => {
    navigator.getUserMedia({ video: true, audio: isMuted }, stream => {
      if (element) {
        element.srcObject = stream;
      }
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start(1000);
      mediaRecorder.ondataavailable = (e) => {
        if (isLiveStarted) {
          console.log("started")
          console.log(socket.id)
          socket.emit("binarystream", e.data);
        }

      }
    },
      error => {
        console.warn(error.message);
      });
  }


  useEffect(() => {

    recordLocalStream(videoPlayer.current)
    if (null !== videoPlayer.current && null !== canvasElement.current) {
      context = canvasElement.current.getContext('2d');
      canvasElement.current.width = videoPlayer.current.width
      canvasElement.current.height = videoPlayer.current.height
      context.canvas.width = canvasElement.current.width;
      context.canvas.height = canvasElement.current.height
    }
  }, [isLiveStarted])

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
        <canvas
          ref={canvasElement}
          style={{ display: "none" }}
        />
      </div>
      <LiveConfirmation
        isVisible={!liveIsEndded && !isLiveStarted}
        liveNow={startLive}
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
        <div className="control-container__actions min">
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