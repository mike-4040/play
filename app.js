let i = 0;
setInterval(() => console.log(`hello from master: ${i++}.`), 1000);

let j = 0;
setInterval(() => console.log(`hello from feature: ${j++}.`), 2000);
