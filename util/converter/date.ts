import moment, { Moment } from "moment"

export const toDateString = (dateIsoString: string | Moment, format: string) => {
  return moment(dateIsoString).format(format);
}
