export const videoPlayer = {}

// import React, {
//   useEffect,
//   useRef,
//   useState,
//   useLayoutEffect
// } from 'react';
// import '../../styles/containers/videoPlayer.less';
// // import { PlayCircleFilled, PauseCircleFilled, SoundFilled, ExpandOutlined } from '@ant-design/icons';
// import MediaStreamRecorder from 'msr'
// import { Button, Input } from 'antd';
// import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
// import { Timer } from '../../../util/time/timer';
// // import socketService from '../../../domain/socket/service';
// import { LIVE_STREAM_HOST, LIVE_STREAM_AUDIENCE } from '../../../domain/socket/redux/actions';
// import { AppState } from '../../../util/redux/store';
// // import SocketStream from "socket.io-stream"
// import { useSelector } from 'react-redux';
// import { LiveStreamModel } from '../../../domain/liveStream/interface';
// import { create_UUID } from '../../../util/uuid';
// import liveStreamService from '../../../domain/liveStream/service';
// import dynamic from 'next/dynamic'

// // import { PlayCircleFilled, PauseCircleFilled, SoundFilled } from '@ant-design/icons';
// // import { Slider } from 'antd';

// interface VideoPlayerProps {
//   src?: string;
//   isLive?: boolean;
//   liveID: string | string[];
// }


// interface LiveData {
//   liveData: LiveStreamModel
// }

// const VideoPlayer: React.FC<VideoPlayerProps> = ({ liveID }) => {
//   const [isPlayed, setIsPlayed] = useState(false);
//   const [isLiveStarted, setStartLive] = useState(false);
//   const [liveIsEndded, setLiveIsEnded] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);
//   const videoPlayer = useRef<HTMLVideoElement>(null);
//   const timeInput = useRef<Input>(null);
//   const { getCount, resetCount } = liveStreamService();

//   const { liveData } = useSelector<AppState, LiveData>((state) => ({
//     liveData: state.liveStream.liveData
//   }))

//   // const videoIndicator = useRef<HTMLDivElement>(null);

//   const startStopVideo = () => {
//     if (videoPlayer.current?.paused) {
//       setIsPlayed(true);
//       videoPlayer.current.play();

//     } else {
//       setIsPlayed(false);
//       videoPlayer.current?.pause();
//     }
//   }

//   const LivstreamConfirmationWithoutSSR = dynamic(() => import('../../containers/LiveConfirmation'),
//     {
//       ssr: false
//     })

//   // const videoTimeUpdate = () => {
//   //   var indicatorPosition = videoPlayer.current.currentTime / videoPlayer.current.duration;
//   //   videoIndicator.current.style.width = indicatorPosition * 100 + '%';
//   //   if (videoPlayer.current.ended) {
//   //     setIsPlayed(false);
//   //   }
//   // }

//   // const changeVolume = (vol: number) => {
//   //   videoPlayer.current.volume = vol;
//   // }

//   // const openFullscreen = () => {
//   //   const elem = videoPlayer.current;
//   //   if (elem.requestFullscreen) {
//   //     elem.requestFullscreen();
//   //   }
//   // }

//   // const changeVideoCurrentTime = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//   //   const pageWidth = window.outerWidth
//   //   const indicatorWidth = event.currentTarget.clientWidth;
//   //   const selectedTimePosition = event.clientX;
//   //   const selectedDecimal = (selectedTimePosition - (pageWidth - indicatorWidth)) / indicatorWidth;
//   //   videoIndicator.current.style.width = selectedDecimal * 100 + '%';
//   //   videoPlayer.current.currentTime = selectedDecimal * videoPlayer.current.duration;

//   // }

//   const endLiveStream = () => {
//     setLiveIsEnded(true);
//     setStartLive(false);
//     resetCount();
//   }

//   const startLive = () => {
//     let timer = new Timer(timeInput.current)
//     timer.start();
//     setStartLive(true);


//   }

//   const sendChunks = (url: string, blob: Blob) => {
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', url, true);
//     xhr.responseType = 'text';
//     xhr.setRequestHeader('Content-Type', 'video/webm');

//     xhr.onload = function (e) {
//       if (this.status === 200) {
//         console.log(this.response);
//       }
//     };
//     xhr.send(blob);
//   }

//   const sendLocalStream = (element: HTMLVideoElement) => {
//     navigator.getUserMedia({ video: true, audio: isMuted }, stream => {
//       if (element) {
//         element.srcObject = stream;
//       }

//       const mediaRecorder = new MediaStreamRecorder(stream);

//       mediaRecorder.mimeType = 'video/webm';
//       mediaRecorder.start(10000);
//       mediaRecorder.ondataavailable = (blob: Blob) => {
//         var count2 = zeroPad(getCount(), 5);
//         // const url = process.env.WEB_2_HLS + 'chunk/' + randomString() + '/' + count2 + (liveIsEndded ? '/finish' : '')
//         const url = process.env.NEXT_PUBLIC_STREAM_SERVICE + '/chunk?prefix=' + liveID + '&num=' + count2 + '&isLast=' + (liveIsEndded ? true : false)
//         sendChunks(url, blob);

//       }
//     },
//       error => {
//         console.warn(error.message);
//       });
//   }
//   const recordLocalStream = (element: HTMLVideoElement) => {
//     navigator.getUserMedia({ video: true, audio: isMuted }, stream => {
//       if (element) {
//         element.srcObject = stream;
//       }
//     },
//       error => {
//         console.warn(error.message);
//       });
//   }

//   const refSelection = (isLive: boolean, element: HTMLVideoElement) => {
//     if (isLive) {
//       sendLocalStream(element)
//     } else {
//       recordLocalStream(element)
//     }
//   }

//   function zeroPad(n: any, chars: any) {
//     var s = '' + n;
//     var l = s.length;
//     return new Array(chars - l + 1).join('0') + s;
//   }
//   return (
//     <div className="live-container" >
//       <div className="video-container">
//         <video
//           autoPlay
//           ref={elem => refSelection(isLiveStarted, elem)}
//           className={`video-player ${isLiveStarted ? '' : 'gray'}`}
//           id="video-player"
//           muted
//         />
//       </div>
//       {
//         !liveIsEndded && !isLiveStarted &&
//         <LivstreamConfirmationWithoutSSR
//           isVisible={!liveIsEndded && !isLiveStarted}
//           liveNow={startLive}
//           liveId={liveID}
//         />
//       }

//       <div
//         className="live-info"
//         style={{ display: `${isLiveStarted ? 'flex' : 'none'}` }}
//       >
//         <div className="live-info__item" >
//           <Input
//             addonBefore="LIVE"

//             ref={timeInput}
//             style={{ width: 120 }}
//           />
//         </div>
//       </div>
//       <div className={`control-container ${isLiveStarted ? 'played' : ''}`}>
//         <div className="control-container__actions min">
//           {
//             !isMuted ?
//               <AudioOutlined onClick={() => setIsMuted(true)} />
//               : <AudioMutedOutlined onClick={() => setIsMuted(false)} />
//           }

//           <Button
//             type="primary"
//             onClick={endLiveStream}
//           >
//             End Live
//           </Button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default VideoPlayer;