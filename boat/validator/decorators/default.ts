import 'reflect-metadata';
import { BoatConstants } from '../../constants';
import { registerCustomValidator } from '../customValidator';

const defaultValueFunction = (value: any) => ({
  validator: 'default_validator',
  value,
  fn: (dto: any, args: { value: any; property: string }) => {
    const properties = Reflect.getMetadata(
      BoatConstants.classOptionalProperties,
      dto,
    );

    if (properties.length == 0) return true;

    const dtoKeys = Object.getOwnPropertyNames(dto);
    const dtoKeysMap = {};
    for (const key of dtoKeys) dtoKeysMap[key] = true;

    if (dtoKeysMap[args.property]) return;
    dto[args.property] = args.value;
  },
});

export function DefaultValue(value: number | string) {
  return registerCustomValidator(defaultValueFunction(value));
}
