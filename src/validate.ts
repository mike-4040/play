import { validateOrReject, type ValidatorOptions } from 'class-validator';
import { type ClassConstructor, plainToInstance } from 'class-transformer';

export async function validate<T extends object>(
  someData: any,
  someClass: ClassConstructor<T>
) {
  if (
    typeof someData !== 'object' ||
    Array.isArray(someData) ||
    someData === null
  ) {
    throw new Error('Invalid input, should be an object');
  }

  const option: ValidatorOptions = {
    forbidUnknownValues: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validationError: { target: false, value: false },
  };

  return validateOrReject(plainToInstance(someClass, someData), option);
}
