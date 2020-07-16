import { AnyAction } from "redux";

export interface Action {
  type: string;
  payload?: AnyAction;
}