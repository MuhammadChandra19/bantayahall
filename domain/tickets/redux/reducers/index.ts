import { Reducer, SingleReducer } from "../../../../util/redux/reducer";
import { Dict } from "../../../../util/types";
import { TicketInterface } from "../../interface";
import { SET_TICKET_LIST } from "../actions";
import { TicketState } from "../states";

export class TicketReducers extends Reducer<TicketState> {
  constructor() {
    super({
      ticketHistory: []
    })
  }

  public setTicketList(state: TicketState, ticketHistory: Array<TicketInterface>): TicketState {
    return {
      ...state,
      ticketHistory
    }
  }

  public get actions(): Dict<SingleReducer<TicketState>> {
    return {
      [SET_TICKET_LIST]: this.setTicketList
    }
  }


}
