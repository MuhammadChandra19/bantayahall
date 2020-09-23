import { Moment } from 'moment';

export interface ConcertsModel {
  concertId: number;
  image: string;
  concertName: string;
  concertDesc: string;
  concertDate: Moment;
  concertPrice: number;
  count: number;
}