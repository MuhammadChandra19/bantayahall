import { LiveStreamModel } from "../../interface";
import { Dict } from "../../../../util/types";

export interface LiveStreamState {
  liveData: LiveStreamModel;
  activeLiveStream: Dict<LiveStreamModel>;
}