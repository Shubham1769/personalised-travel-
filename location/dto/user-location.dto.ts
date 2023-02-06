import {
  IsArray,
  IsLatitude,
  IsLatLong,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserLocationDto {
  @IsLatitude()
  @IsOptional()
  lat: number;

  @IsLongitude()
  @IsOptional()
  long: number;
}
