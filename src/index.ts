interface Human {
  name: string
  age: number
  gender: string
}

const person = {
  name: '철수',
  age: 30,
  gender: 'male',
}

const sayHi = (person: Human): string => {
  return `hello ${person.name}, you are ${person.age}, ${person.gender}!!`
}

const data = sayHi(person)
console.log(data)
