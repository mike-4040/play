const foo = [ 10, 20];


function bar( arg) {
    arg = arg.filter( el => el < 15);
    console.log('Inside', arg)
}

bar(foo);

console.log(foo);
