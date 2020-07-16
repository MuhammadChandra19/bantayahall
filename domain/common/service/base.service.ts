import { Store } from "redux";
import { NextRouter, useRouter } from "next/router";
import { AppStore, AppState } from "../../../util/redux/store";
import { SET_LOADING } from "../redux/actions";

export class BaseService {
  private route: NextRouter;
  private store: Store;

  constructor() {
    this.route = useRouter();
    this.store = AppStore;
  }

  protected goTo(): NextRouter {
    return this.route;
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