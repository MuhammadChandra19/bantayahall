import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  ReducersMapObject,

  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CommonReducer } from '../../domain/common/redux/reducers';
import { CommonState } from '../../domain/common/redux/states';
import { LayoutState } from '../../domain/layout/redux/states';
import { LayoutReducer } from '../../domain/layout/redux/reducers';

export interface AppState {
  common: CommonState;
  layout: LayoutState;
}

const logger: Middleware = () => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(action);
  }
  return next(action);
};

export function configureStore(): Store<AppState> {
  let middleware = applyMiddleware(logger);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  let rootReducer: ReducersMapObject<AppState, any> = {
    common: new CommonReducer().build(),
    layout: new LayoutReducer().build(),
  }

  return createStore(
    combineReducers<AppState>(rootReducer),
    middleware
  )
}

export const AppStore = configureStore();
// console.log(AppStore.getState().layout.isSideBarVisible)

