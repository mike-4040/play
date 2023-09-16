export async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  console.log(response.ok);
  return response.json();
}

console.log({ module })
