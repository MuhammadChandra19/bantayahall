import { LayoutState } from "../states";
import { Reducer, SingleReducer } from "../../../../util/redux/reducer";
import { Dict } from "../../../../util/types";
import { SET_SIDEBAR_VISIBILITY } from "../actions";

export class LayoutReducer extends Reducer<LayoutState> {
  constructor() {
    super({
      isSideBarVisible: false
    })
  }

  public setSideBarVisibility(state: LayoutState, isSideBarVisible: boolean): LayoutState {
    return {
      ...state,
      isSideBarVisible
    }
  }

  get actions(): Dict<SingleReducer<LayoutState>> {
    return {
      [SET_SIDEBAR_VISIBILITY]: this.setSideBarVisibility
    }
  }
}