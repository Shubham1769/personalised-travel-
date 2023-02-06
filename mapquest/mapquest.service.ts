import { IGoogleMapsConfig } from '@/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { Client, UnitSystem } from '@googlemaps/google-maps-services-js';
import { GenericException } from '@/boat';
import { GetAttractionsDto, GetRoutesDto } from './validators/googleMaps';
import { douglasPeucker } from './utils';

@Injectable()
export class MapquestService {
  public config: IGoogleMapsConfig;
  public client: Client;
  constructor(private configService: ConfigService) {
    this.config = this.configService.get('google');
    this.client = new Client({
      config: {
        params: {
          key: this.config.apiKey,
        },
      },
    });
  }

  // async getPlacesPredictions(inputs: any) {
  //   try {
  //     const result = await this.client.get(this.config.placeUrl, {
  //       params: {
  //         q: inputs.q,
  //         collection: 'adminArea,airport,category,franchise,poi',
  //         maxResults: inputs.maxResults,
  //         countryCode: inputs.countryCode,
  //         ...(inputs.latLong && { location: inputs.latLong }),
  //       },
  //     });
  //     return result.data.results;
  //   } catch (e) {
  //     console.log(
  //       '🚀 ~ file: mapquest.service.ts:37 ~ MapquestService ~ getPlacesPredictions ~ e',
  //       e.response.data,
  //     );
  //     throw new GenericException('Unable to get places predictions');
  //   }
  // }

  async getPlacesPredictions(inputs: { q: string; lat: number; lng: number }) {
    try {
      const result = await this.client.placeAutocomplete({
        params: {
          input: inputs.q,
          key: this.config.apiKey,
          ...(inputs.lat &&
            inputs.lng && { location: { lat: inputs.lat, lng: inputs.lng } }),
        },
      });
      console.log(
        '🚀 ~ file: mapquest.service.ts:53 ~ MapquestService ~ getPlacesPredictions ~ result',
        result.data,
      );
      return result?.data?.predictions.map((item) => {
        return {
          description: item.description,
          placeId: item.place_id,
        };
      });
    } catch (e) {
      console.log(
        '🚀 ~ file: mapquest.service.ts:37 ~ MapquestService ~ getPlacesPredictions ~ e',
        e.response.data,
      );
      throw new GenericException('Unable to get places predictions');
    }
  }

  async getRoutes(inputs: GetRoutesDto) {
    try {
      const result = await this.client.directions({
        params: {
          origin: inputs.origin,
          destination: inputs.destination,

          key: this.config.apiKey,
          units: UnitSystem.metric,
          mode: inputs.travelMode,

          // ...(inputs.waypoints && { waypoints: inputs.waypoints }),
        },
      });
      // const simplifiedPoints = douglasPeucker(
      //   result.data?.routes[0]?.legs?.[0]?.steps?.reduce((acc, item) => {
      //     acc.push({
      //       y: item.start_location.lng,
      //       x: item.start_location.lat,
      //     });
      //     return acc;
      //   }, [] as { x: number; y: number }[]),
      //   0.01,
      // );
      // const data = [];
      // for (const point of simplifiedPoints) {
      //   const result = await this.client.placesNearby({
      //     params: {
      //       location: { lat: point.x, lng: point.y },
      //       key: this.config.apiKey,
      //       radius: 2000,
      //       type: 'tourist_attraction',
      //     },
      //   });
      //   data.push(result.data);
      // }
      return {
        route: result.data?.routes[0],
        // places: data.map((item) => item.results).flat(),
      };
    } catch (e) {
      console.log(
        '🚀 ~ file: mapquest.service.ts:37 ~ MapquestService ~ getPlacesPredictions ~ e',
        e.response.data,
      );
      throw new GenericException('Unable to get places predictions');
    }
  }

  async getAttractions(inputs: GetAttractionsDto) {
    try {
      const result = await this.client.placesNearby({
        params: {
          // location: { lat: inputs.lat, lng: inputs.lng },
          location: inputs.place,
          key: this.config.apiKey,
          radius: 2000,
          type: 'tourist_attraction',
        },
      });
      return result.data.results;
    } catch (e) {
      console.log(
        '🚀 ~ file: mapquest.service.ts:37 ~ MapquestService ~ getPlacesPredictions ~ e',
        e.response.data,
      );
      throw new GenericException('Unable to get places predictions');
    }
  }

  // async getAttractions(data: any) {
  //   try {
  //     const line = data?.reduce((acc: number[], item: any) => {
  //       acc.push(item.startPoint.lat);
  //       acc.push(item.startPoint.lng);
  //       return acc;
  //     }, []);
  //     console.log(
  //       '🚀 ~ file: mapquest.service.ts:67 ~ MapquestService ~ line ~ line',
  //       line,
  //     );
  //     const result = await this.client.post(this.config.corridorUrl, {
  //       // params: {
  //       line: line,
  //       // sessionId: data,
  //       units: 'k',
  //       ambiguities: 'check',
  //       collections: 'adminArea,airport,category,franchise,poi',

  //       // ...(inputs.waypoints && { waypoints: inputs.waypoints }),
  //       // },
  //     });

  //     return result.data;
  //   } catch (e) {
  //     console.log(
  //       '🚀 ~ file: mapquest.service.ts:37 ~ MapquestService ~ getPlacesPredictions ~ e',
  //       e.response.data,
  //     );
  //     return [];
  //   }
  // }
}
