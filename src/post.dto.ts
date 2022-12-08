import { Length, IsInt } from 'class-validator';

export class Post {
  @Length(10, 20, {
    message:
      'Title is not valid, should be between $constraint1 and $constraint2 characters long',
  })
  title: string;

  @IsInt({ context: { code: 400, message: 'Age should be an integer' } })
  age: number;
}
