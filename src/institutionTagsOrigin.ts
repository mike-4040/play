/*
*
{
    finicity_institution_id_1: [tag1, tag2, tag3],
    finicity_institution_id_2: [tag4, tag5, tag6]
}
*/

import { readFile } from 'fs/promises';

const file = await readFile('./data2.csv', 'utf-8');
console.log(file);
const lines = file.split('\n');
console.log(lines);
const result: Record<string, string[]> = {};
const lastTagTimes: Map<string, number> = new Map();

lines
  .slice(1)
  .filter((line) => line.length)
  .map((line) => line.split(','))
  .filter((lineArr) => lineArr[3] != 'true')
  .sort((a, b) => new Date(a[4]).getTime() - new Date(b[4]).getTime())
  .forEach(([id, institution_id, tag, _isDeleted, createdAt]) => {
    if (institution_id in result) {
      const lastTagTime = lastTagTimes.get(tag);
      // if( institution_id === '1') {
      //   console.log({id, lastTagTime, tag, createdAt, created_at: new Date(createdAt).getTime()} );

      // }
      if (new Date(createdAt).getTime() - (lastTagTime as number)) {
        result[institution_id].push(tag);
        lastTagTimes.set(tag, new Date(createdAt).getTime());
      }
    } else {
      result[institution_id] = [tag];
      lastTagTimes.set(tag, new Date(createdAt).getTime());
    }
  });

console.log(result);
