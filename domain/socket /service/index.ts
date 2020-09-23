import { baseService } from "../../common/service/base.service";
import io from 'socket.io-client';
import { RUNNING_LIVE_STREAM } from "../redux/actions";
import { LiveStreamModel } from "../../liveStream/interface";
import { SET_ACTIVE_LIVE_STREAM } from "../../liveStream/redux/actions";

const socketService = () => {

  const { dispatch } = baseService()
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_QUEUE);

  socket.on(RUNNING_LIVE_STREAM, (liveData: LiveStreamModel) => {
    dispatch(SET_ACTIVE_LIVE_STREAM, { ...liveData });
  })

  return {
    socket,
  }

}

export default socketService;