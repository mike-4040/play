import { Post } from './post.dto.js';
import { validate } from './validate.js';

const post: any = {
  title: 'Some title',
  age: 10,
  // someBadProp: 'someBadValue',
};

console.log('\n', { post });

try {
  await validate(post, Post);

  console.log('\n', 'Valid!');
} catch (errors) {
  console.log('\n', 'Invalid!');
  console.dir(errors, { depth: null });
}
