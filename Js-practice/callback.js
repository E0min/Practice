function Animal() {
  this.type = 'Animal';
}

function NewConstructor() {
  console.log('new constructor');
}

const dog = new Animal();
const cat = new Animal();

console.log(dog.constructor);  // Animal

dog.constructor = NewConstructor;
console.log(dog.constructor);  // NewConstructor
console.log(cat.constructor);
