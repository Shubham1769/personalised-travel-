import { BoatConstants } from '../constants';

export function registerCustomValidator(validator: Record<string, any>) {
  return function (...args: string[] | any[]) {
    const properties =
      Reflect.getMetadata(BoatConstants.classOptionalProperties, args[0]) || [];

    const validators =
      Reflect.getMetadata(
        BoatConstants.customValidationDecorators,
        args[0],
        args[1]
      ) || [];

    Reflect.defineMetadata(
      BoatConstants.classOptionalProperties,
      [...properties, args[1]],
      args[0]
    );

    Reflect.defineMetadata(
      BoatConstants.customValidationDecorators,
      [...validators, validator],
      args[0],
      args[1]
    );
  };
}
