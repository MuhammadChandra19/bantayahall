import { baseService } from "../../common/service/base.service";
import { SET_SIDEBAR_VISIBILITY, SET_ACTIVE_SIDEBAR_MENU } from "../redux/actions";


interface LayputServiceProps {
  toggleSideBar: (isVisible?: boolean) => void;
  setActiveSideBarMenu: (key: string) => void
}
const layoutService = (): LayputServiceProps => {
  const { dispatch, getState } = baseService()
  const toggleSideBar = (isVisible: boolean = null): void => {

    let visibility: boolean;
    const { layout: { isSideBarVisible } } = getState();
    if (isVisible !== null) {
      visibility = isVisible
    } else {
      visibility = !isSideBarVisible
    }

    dispatch(SET_SIDEBAR_VISIBILITY, visibility);
  }

  const setActiveSideBarMenu = (key: string) => {
    dispatch(SET_ACTIVE_SIDEBAR_MENU, key);
  }

  return {
    toggleSideBar,
    setActiveSideBarMenu
  }
}
export default layoutService