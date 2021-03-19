console.time()
for ( let i = 0; i < 10000000; i++) {
    //const t = new Date().getTime();
    const t = Date.now();
}
console.timeEnd()
console.log(Date.now())