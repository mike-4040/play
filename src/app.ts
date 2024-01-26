const post: any = {
  title: 'Some title',
  age: 10.1,
  // someBadProp: 'someBadValue',
};

function logSomething(something: string | number): void {
  console.log(something);
}


function test() {
  try {
    logSomething(10);
    // return;
    throw new Error('Some error');
  } catch (errors) {
    console.dir(errors, { depth: null });
    logSomething('Some error');
  } finally {
    console.log('Finally');
  }
}

test()
