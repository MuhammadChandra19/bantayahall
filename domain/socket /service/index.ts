import { baseService } from "../../common/service/base.service";
import io from 'socket.io-client';
import { INIT_LIVE_STREAM, RUNNING_LIVE_STREAM, LIVE_STREAM_HOST } from "../redux/actions";
import { LiveStreamModel, LiveType } from "../../liveStream/interface";
import { SET_ACTIVE_LIVE_STREAM, SET_LIVE_STREAM_DATA } from "../../liveStream/redux/actions";
import { create_UUID } from "../../../util/uuid";

const socketService = () => {

  const { dispatch, getState } = baseService()
  const socket = io(process.env.NEXT_PUBLIC_STREAM_SERVICE);

  socket.on(RUNNING_LIVE_STREAM, (liveData: LiveStreamModel) => {
    dispatch(SET_ACTIVE_LIVE_STREAM, { ...liveData });
  })

  return {
    socket,
  }

}

export default socketService;