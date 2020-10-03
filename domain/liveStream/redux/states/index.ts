import { LiveStreamAPIModel, LiveStreamModel } from "../../interface";
import { Dict } from "../../../../util/types";

export interface LiveStreamState {
  liveData: LiveStreamAPIModel;
  activeLiveStream: Dict<LiveStreamModel>;
}