import { scheduler } from 'node:timers/promises';




async function asyncFunction(param: string) {
  await scheduler.wait(1_000);
  console.timeLog();
  console.log('asyncFunction', param);
  return param + '1';
}

async function main(param: string) {
  console.time();
  return asyncFunction(param).then(asyncFunction).then(asyncFunction);
}

const result = await main('Hello');
console.timeLog();
console.log('main, final result', result);


export default {};