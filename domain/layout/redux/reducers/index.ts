import { LayoutState } from "../states";
import { Reducer, SingleReducer } from "../../../../util/redux/reducer";
import { Dict } from "../../../../util/types";
import { SET_SIDEBAR_VISIBILITY, SET_ACTIVE_SIDEBAR_MENU } from "../actions";

export class LayoutReducer extends Reducer<LayoutState> {
  constructor() {
    super({
      isSideBarVisible: false,
      activeSideBarMenu: '1'
    })
  }

  public setSideBarVisibility(state: LayoutState, isSideBarVisible: boolean): LayoutState {
    return {
      ...state,
      isSideBarVisible
    }
  }

  public setActiveSideBarMenu(state: LayoutState, activeSideBarMenu: string): LayoutState {
    return {
      ...state,
      activeSideBarMenu
    }
  }

  get actions(): Dict<SingleReducer<LayoutState>> {
    return {
      [SET_SIDEBAR_VISIBILITY]: this.setSideBarVisibility,
      [SET_ACTIVE_SIDEBAR_MENU]: this.setActiveSideBarMenu
    }
  }
}