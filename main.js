const NUMBER_OF_ITERS = 1_000_000;

function work(iters, log) {
  for (let i = 0; i < iters; i++) {
    log && console.log(i);
  }
}

console.time('log')
const start1 = Date.now();
work(NUMBER_OF_ITERS, true);
console.timeEnd('log')
const end1 = Date.now();

console.log('time with log: ', end1 - start1);

console.log('------------------');

const start2 = Date.now();
console.time('no-log')
work(NUMBER_OF_ITERS, false);
console.timeEnd('no-log')
const end2 = Date.now();

console.log('time without log: ', end2 - start2);


