import { LiveStreamAPI } from "../../../api/livestream"
import { LiveStreamModel, LiveStreamAPIModel } from "../interface"
import { baseService } from "../../common/service/base.service"
import { Dict } from "../../../util/types"
import { SET_BULK_ACTIVE_LIVE_STREAM, SET_LIVE_STREAM_DATA } from "../redux/actions"
import { SET_LOADING } from "../../common/redux/actions"

const liveStreamService = () => {
  const liveStreamAPI = new LiveStreamAPI()
  const { dispatch, setLoading } = baseService()
  const getCount = () => {
    let result = 0
    const countChunks = localStorage.getItem('countChunks')
    if (!countChunks) {
      localStorage.setItem('countChunks', "0")
    } else {
      result = parseInt(countChunks) + 1;
      localStorage.setItem('countChunks', result.toString())
    }
    return result;
  }

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

  const getLiveStreamById = async (id: string): Promise<void> => {
    try {
      setLoading(SET_LIVE_STREAM_DATA, true);
      const { data } = await liveStreamAPI.getLiveStreamById(id);
      dispatch(SET_LIVE_STREAM_DATA, data[id]);
    } catch {
      setLoading(SET_LIVE_STREAM_DATA, false);
    }
  }



  const resetCount = () => {
    localStorage.removeItem('countChunks')
  }

  return {
    getCount,
    resetCount,
    initiateLiveStream,
    getListOfActiveLiveStream,
    setCurrentWatching,
    getLiveStreamById
  }

}

export default liveStreamService;