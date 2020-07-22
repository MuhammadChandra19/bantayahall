import { Store } from "redux";
import { AppStore, AppState } from "../../../util/redux/store";
import { SET_LOADING } from "../redux/actions";


interface BaseServiceInterface {
  dispatch: (type: string, payload: any) => void;
  getState: () => Readonly<AppState>;
  setLoading: (action: string, loading: boolean) => void

}
export const baseService = (): BaseServiceInterface => {
  const store: Store = AppStore;

  const dispatch = (type: string, payload: any): void => {
    store.dispatch({ type, payload })
  }

  const getState = (): Readonly<AppState> => {
    return store.getState();
  }

  const setLoading = (action: string, loading: boolean): void => {
    dispatch(SET_LOADING, {
      key: action,
      value: loading
    })
  }
  return {
    dispatch,
    getState,
    setLoading,
  }
}
export class BaseService {
  private store: Store;

  constructor() {
    this.store = AppStore;
  }

  protected setLoading(action: string, loading: boolean): void {
    this.dispatch(SET_LOADING, {
      key: action,
      value: loading
    })
  }

  protected getState(): Readonly<AppState> {
    return this.store.getState();
  }

  protected dispatch(type: string, payload: any): void {
    this.store.dispatch({ type, payload })
  }

}