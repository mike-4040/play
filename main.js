import { scheduler } from 'node:timers/promises';

let i = 0;
async function something() {
  ++i;
  console.log(`making: something #${i}`);
  await scheduler.wait(1000);
  const result = `something #${i}`;
  console.log(`made:   ${result}`);
  return result;
}

const COUNT = 5;

async function makeCountOfSomething(count) {
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(await something());
  }
  return results;
}

const allSomething = await makeCountOfSomething(COUNT);

console.log(`allSomething is ready`);

allSomething.forEach((result) => console.log(`result: ${result}`));

async function* generateCountOfSomething(count) {
  for (let i = 0; i < count; i++) {
    yield await something();
  }
}

console.log('generating count of something');
for await (const result of generateCountOfSomething(COUNT)) {
  console.log(`result: ${result}`);
}
