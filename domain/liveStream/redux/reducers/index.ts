import { Reducer, SingleReducer } from "../../../../util/redux/reducer";
import { LiveStreamState } from "../states"
import { LiveStreamModel, AddAudience } from "../../interface";
import { Dict } from "../../../../util/types";
import { ADD_USER_AS_AUDIENCE, SET_LIVE_STREAM_DATA, SET_ACTIVE_LIVE_STREAM, REMOVE_USER_FROM_AUDIENCE } from "../actions";

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
        [liveData.liveId]: liveData
      }
    }
  }

  public addUserAsAudience(state: LiveStreamState, audience: AddAudience): LiveStreamState {
    return {
      ...state,
      liveData: {
        ...state.liveData,
        audience: [...state.liveData.audience, audience.user]
      }
    }
  }

  public removeUserFromAudience(state: LiveStreamState, userId: string): LiveStreamState {
    const removedUser = state.liveData.audience.filter(user => user.userId !== userId)
    return {
      ...state,
      liveData: {
        ...state.liveData,
        audience: removedUser
      }
    }
  }

  public get actions(): Dict<SingleReducer<LiveStreamState>> {
    return {
      [ADD_USER_AS_AUDIENCE]: this.addUserAsAudience,
      [SET_LIVE_STREAM_DATA]: this.setLiveStreamData,
      [SET_ACTIVE_LIVE_STREAM]: this.setActiveLiveStream,
      [REMOVE_USER_FROM_AUDIENCE]: this.removeUserFromAudience
    }
  }
}