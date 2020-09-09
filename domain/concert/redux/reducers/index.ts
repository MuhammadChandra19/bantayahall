import { Reducer, SingleReducer } from "../../../../util/redux/reducer";
import { ConcertsStates } from "../states";
import { ConcertsModel } from "../../interface";
import { Dict } from "../../../../util/types";
import { SET_LIST_CONCERTS } from '../actions'

export class ConcertsReducer extends Reducer<ConcertsStates> {

  constructor() {
    super({
      availableConcerts: []
    })
  }

  public setListConcerts(states: ConcertsStates, listConcerts: Array<ConcertsModel>): ConcertsStates {
    return {
      ...states,
      availableConcerts: listConcerts
    }
  }

  public get actions(): Dict<SingleReducer<ConcertsStates>> {
    return {
      [SET_LIST_CONCERTS]: this.setListConcerts
    }
  }
}