import { Reducer, SingleReducer } from "../../../../util/redux/reducer";
import { LiveStreamState } from "../states"
import { LiveStreamModel, AddAudience } from "../../interface";
import { Dict } from "../../../../util/types";
import { ADD_USER_AS_AUDIENCE, SET_LIVE_STREAM_DATA, SET_ACTIVE_LIVE_STREAM, REMOVE_USER_FROM_AUDIENCE, SET_BULK_ACTIVE_LIVE_STREAM } from "../actions";

export class LiveStreamReducer extends Reducer<LiveStreamState> {

  constructor() {
    super({
      activeLiveStream: {},
      liveData: {} as LiveStreamModel
    })
  }

  public setLiveStreamData(state: LiveStreamState, liveData: LiveStreamModel): LiveStreamState {
    return {
      ...state,
      liveData
    }
  }

  public setActiveLiveStream(state: LiveStreamState, liveData: LiveStreamModel): LiveStreamState {
    return {
      ...state,
      activeLiveStream: {
        ...state.activeLiveStream,
        [liveData.liveId]: {
          ...liveData
        }
      }
    }
  }

  public setBulkActiveLiveStream(state: LiveStreamState, listLive: Dict<LiveStreamModel>): LiveStreamState {
    return {
      ...state,
      activeLiveStream: listLive
    }
  }

  public get actions(): Dict<SingleReducer<LiveStreamState>> {
    return {
      [SET_LIVE_STREAM_DATA]: this.setLiveStreamData,
      [SET_ACTIVE_LIVE_STREAM]: this.setActiveLiveStream,
      [SET_BULK_ACTIVE_LIVE_STREAM]: this.setBulkActiveLiveStream
    }
  }
}