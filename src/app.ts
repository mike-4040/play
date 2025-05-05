function hello() {
  console.log("Hello, world!");
}

console.log(hello.name)


const word = () => console.log("Hello, world!");

console.log(word.name)

console.log((() => console.log("Hello, world!")).name)

// console.log(hello.toString())