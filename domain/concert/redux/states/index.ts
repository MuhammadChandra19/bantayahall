import { ConcertsModel } from "../../interface";
import { Dict } from "../../../../util/types";

export interface ConcertsStates {
  availableConcerts: Dict<ConcertsModel>;
}