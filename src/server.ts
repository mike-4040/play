// import dotenv from 'dotenv';
// dotenv.config();

// import app from './app.js';

// app.listen(app.get('port'), () =>
//   console.log(`Server running on port ${app.get('port')}`)
// );

console.time()
const iters = 10_000_000_000;
for ( let i =0; i < iters; i++) {
  Math.random( )

}
console.timeEnd()