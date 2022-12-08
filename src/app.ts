import { Post } from './post.dto.js';
import { validate } from './validate.js';

const post: any = {
  title: 'Some title',
  age: 10.1,
  // someBadProp: 'someBadValue',
};

console.log('\n', { post }, '\n');

try {
  await validate(post, Post);

  console.log('Valid!');
} catch (errors) {
  console.log('Invalid!');
  console.dir(errors, { depth: null });
}
