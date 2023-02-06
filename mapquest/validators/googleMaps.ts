import { DefaultValue } from '@/boat/validator';
import { TravelMode } from '@googlemaps/google-maps-services-js';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsLatitude,
  IsLatLong,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetPredictionsDto {
  @IsString()
  @IsNotEmpty({ message: 'Query is required' })
  q: string;

  @IsNumber()
  @IsOptional()
  @DefaultValue(10)
  maxResults: number;

  @IsString()
  @IsOptional()
  @DefaultValue('IN')
  countryCode: string;

  @IsLatitude()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  lat: number;

  @IsLongitude()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  lng: number;
}

export class GetRoutesDto {
  @IsString()
  @DefaultValue(TravelMode.driving)
  @IsIn([TravelMode.driving, TravelMode.walking, TravelMode.bicycling])
  @IsOptional()
  travelMode: TravelMode;

  @IsString()
  @Transform(({ value }) => `place_id:${value}`)
  @IsNotEmpty({ message: 'Origin is required' })
  origin: string;

  @IsString()
  @Transform(({ value }) => `place_id:${value}`)
  @IsNotEmpty({ message: 'Destination is required' })
  destination: string;
}

export class GetAttractionsDto {
  @IsString()
  @Transform(({ value }) => `place_id:${value}`)
  @IsNotEmpty({ message: 'Destination is required' })
  place: string;
}
