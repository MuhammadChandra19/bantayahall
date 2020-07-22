import { baseService } from "../../common/service/base.service";
import { SET_SIDEBAR_VISIBILITY } from "../redux/actions";


interface LayputServiceProps {
  toggleSideBar: (isVisible?: boolean) => void
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

  return {
    toggleSideBar
  }
}
export default layoutService