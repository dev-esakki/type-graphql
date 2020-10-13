import { User } from './../../entity/User';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: true })
  export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: any) {
      return User.findOne({ where: { email }}).then((user: User | undefined): boolean => {
        if (user) return false;
        return true;
      });
    }
  }
  
  export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserAlreadyExistConstraint,
      });
    };
  }