let i = 0;
setInterval(() => console.log(`hello from master: ${i++}. Change in master`), 1000);

let j = 0;
setInterval(() => console.log(`hello from feature: ${j++}.`), 2000);

// change in master

