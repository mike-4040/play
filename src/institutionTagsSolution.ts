/*
*
{
    finicity_institution_id_1: [tag1, tag2, tag3],
    finicity_institution_id_2: [tag4, tag5, tag6]
}
*/

import { readFile } from 'fs/promises';

const file = await readFile('./data2.csv', 'utf-8');
const lines = file.split('\n');
const lastTagTimes: Map<string, number> = new Map();

const dataLines = lines
  .slice(1)
  .filter((line) => line.length)
  .map((line) => {
    const [_id, institutionId, tag, isDeleted, created_at] = line.split(',');
    return {
      institutionId,
      tag,
      isDeleted,
      createdAt: new Date(created_at).getTime(),
    };
  })
  .filter(({ isDeleted }) => isDeleted != 'true');

// make a map of latest tag times
dataLines.forEach(({ tag, createdAt }) => {
  const lastTagTime = lastTagTimes.get(tag);
  if (!lastTagTime || createdAt > lastTagTime) {
    lastTagTimes.set(tag, createdAt);
  }
});

const result = dataLines.reduce((acc, { institutionId, tag, createdAt }) => {
  if (createdAt !== (lastTagTimes.get(tag) as number)) {
    return acc;
  }

  if (!(institutionId in acc)) {
    acc[institutionId] = [];
  }
  acc[institutionId].push(tag);

  return acc;
}, {} as Record<string, string[]>);

console.log(result);
