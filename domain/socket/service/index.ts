import { baseService } from "../../common/service/base.service";
import io from 'socket.io-client';
import { INIT_LIVE_STREAM, RUNNING_LIVE_STREAM, LIVE_STREAM_HOST } from "../redux/actions";
import { LiveStreamModel, LiveType } from "../../liveStream/interface";
import { SET_ACTIVE_LIVE_STREAM } from "../../liveStream/redux/actions";

const socketService = () => {

  const { dispatch, getState } = baseService()
  const socket = io(process.env.SOCKET);

  socket.on(RUNNING_LIVE_STREAM, (liveStream: LiveStreamModel) => {
    dispatch(SET_ACTIVE_LIVE_STREAM, liveStream);
  })

  const startLiveStream = (title: string, type: LiveType) => {
    const liveStream: LiveStreamModel = {
      liveId: socket.id,
      socketId: socket.id,
      stream: {} as MediaStream,
      title,
      type,
      audience: [],
      thumbnails: 'default'
    }
    socket.emit(INIT_LIVE_STREAM, liveStream)
  }

  return {
    socket,
    startLiveStream
  }

}

export default socketService;