import { TripBudget, TRIP_TYPE } from '@/interfaces';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsArray()
  stops: string[];

  @Transform(({ value }) => {
    if (value < 10000) return { min: 1, max: 1 };
    if (value < 20000) return { min: 1, max: 2 };
    if (value < 30000) return { min: 1, max: 3 };
    if (value < 40000) return { min: 1, max: 3 };
    return { min: 2, max: 4 };
  })
  @IsOptional()
  budget: TripBudget;

  @IsEnum(TRIP_TYPE)
  @IsIn(Object.values(TRIP_TYPE))
  @IsOptional()
  type: TRIP_TYPE;
}
