import { LiveStreamAPI } from "../../../api/livestream"
import { LiveStreamModel, IMessageClient, LiveStreamAPIModel } from "../interface"
import { baseService } from "../../common/service/base.service"
import { SET_BULK_ACTIVE_LIVE_STREAM, SET_LIVE_STREAM_DATA, JOIN_LIVE_STREAMING_ROOM } from "../redux/actions"
import { SEND_MESSAGE } from "../../socket/redux/actions"
import { SocketQueue } from "../../../api/socketQueue"

const liveStreamService = () => {
  const liveStreamAPI = new LiveStreamAPI()
  const socketQueueAPI = new SocketQueue()
  const { dispatch, setLoading } = baseService()

  const initiateLiveStream = async (data: LiveStreamModel) => {
    try {
      await liveStreamAPI.newLiveStream(data);
    } catch (e) {
      throw e
    }
  }

  const setCurrentWatching = (data: LiveStreamModel) => {
    dispatch(SET_LIVE_STREAM_DATA, data)
  }

  const getListOfActiveLiveStream = async (limit: number = 10, page: number = 0): Promise<void> => {
    try {
      setLoading(SET_BULK_ACTIVE_LIVE_STREAM, true)
      const { data } = await liveStreamAPI.loadListActiveLiveStream(limit, page)
      dispatch(SET_BULK_ACTIVE_LIVE_STREAM, data)

    } catch (e) {
      throw e
    } finally {
      setLoading(SET_BULK_ACTIVE_LIVE_STREAM, false)
    }
  }

  const getLiveStreamById = async (id: any): Promise<LiveStreamAPIModel | null> => {
    try {
      setLoading(SET_LIVE_STREAM_DATA, true);
      const { data } = await liveStreamAPI.getLiveStreamById(id) || null;
      if (data && data[id]) {
        dispatch(SET_LIVE_STREAM_DATA, data[id]);
      }
      return data
    } catch (e) {
      throw e
    } finally {
      setLoading(SET_LIVE_STREAM_DATA, false);
    }
  }

  const enterLiveRoom = async (name: string, room: string): Promise<void> => {
    try {
      setLoading(JOIN_LIVE_STREAMING_ROOM, true);
      await socketQueueAPI.joinLiveStream(name, room);
    } catch (e) {
      throw e
    } finally {
      setLoading(JOIN_LIVE_STREAMING_ROOM, false);
    }
  }

  const sendMessageToRoom = async (message: IMessageClient): Promise<IMessageClient> => {
    try {
      setLoading(SEND_MESSAGE, true);
      const { data } = await socketQueueAPI.sendMessage(message)
      return data;
    } catch (e) {
      throw e
    } finally {
      setLoading(SEND_MESSAGE, false);
      return {} as IMessageClient
    }
  }

  return {
    initiateLiveStream,
    getListOfActiveLiveStream,
    setCurrentWatching,
    getLiveStreamById,
    enterLiveRoom,
    sendMessageToRoom
  }

}

export default liveStreamService;