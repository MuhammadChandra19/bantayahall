import { BaseService } from "../../common/service/base.service";
import io from 'socket.io-client';
const { RTCPeerConnection, RTCSessionDescription } = window;

class SocketService extends BaseService {
  private socket: SocketIOClient.Socket;
  private peerConnection: RTCPeerConnection;

  constructor(element: HTMLVideoElement = null) {
    super();
    this.socket = io(process.env.SOCKET);
    this.peerConnection = new RTCPeerConnection();
    this.init(element);

  }

  private init(element: HTMLVideoElement = null): void {
    if (element) {
      this.recordLocalStream(element);
    }

  }

  public startNewLiveStream(element: HTMLVideoElement): void {
  }

  private recordLocalStream(element: HTMLVideoElement): void {
    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        if (element) {
          element.srcObject = stream;
        }

        stream.getTracks().forEach(track => this.peerConnection.addTrack(track, stream));
      },
      error => {
        console.warn(error.message);
      });
  }

}

export default SocketService;