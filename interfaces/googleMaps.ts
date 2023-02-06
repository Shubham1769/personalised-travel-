import { TRIP_TYPE } from './common';

export interface IGoogleMapsConfig {
  apiKey: string;
  attractions: {
    [key: string]: string[];
  };
}
