import { baseService } from "../../common/service/base.service";
import io from 'socket.io-client';
import { INIT_LIVE_STREAM, RUNNING_LIVE_STREAM, LIVE_STREAM_HOST } from "../redux/actions";
import { LiveStreamModel, LiveType } from "../../liveStream/interface";
import { SET_ACTIVE_LIVE_STREAM, SET_LIVE_STREAM_DATA } from "../../liveStream/redux/actions";
import { create_UUID } from "../../../util/uuid";

const socketService = () => {

  const { dispatch, getState } = baseService()
  const socket = io(process.env.SOCKET);

  socket.once(RUNNING_LIVE_STREAM, (liveData: LiveStreamModel) => {
    dispatch(SET_ACTIVE_LIVE_STREAM, { ...liveData });
  })
  const startLiveStream = (title: string, type: LiveType, id: string) => {
    const liveStream: LiveStreamModel = {
      userId: '969869',
      liveId: id,
      title,
      type,
    }
    socket.emit(INIT_LIVE_STREAM, { ...liveStream })
    dispatch(SET_LIVE_STREAM_DATA, liveStream);
  }

  return {
    socket,
    startLiveStream
  }

}

export default socketService;