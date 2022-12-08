import { validateOrReject, type ValidatorOptions } from 'class-validator';
import { type ClassConstructor, plainToInstance } from 'class-transformer';

export async function validate<T extends object>(
  input: any,
  someClass: ClassConstructor<T>
) {
  if (typeof input !== 'object' || Array.isArray(input) || input === null) {
    throw new Error('Invalid input, should be an object');
  }

  const option: ValidatorOptions = {
    forbidUnknownValues: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validationError: { target: false, value: false },
  };

  return validateOrReject(plainToInstance(someClass, input), option);
}
