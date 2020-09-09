import { Moment } from 'moment';

export interface ConcertsModel {
  id: number;
  image: string;
  concertName: string;
  concertDesc: string;
  concertDate: Moment;
  concertPrice: number;
}