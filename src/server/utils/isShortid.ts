import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { isValid } from 'shortid';

@ValidatorConstraint()
@Injectable()
export class IsShortidConstraint implements ValidatorConstraintInterface {
  public validate = (id: string) => {
    return isValid(id);
  };

  public defaultMessage = () => {
    return 'ID ($value) isn\'t an valid shortid!';
  };
}

export function IsShortID(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function verify(object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsShortidConstraint,
    });
  };
}
