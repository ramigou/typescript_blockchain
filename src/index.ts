class Human {
  public name: string
  public age: number
  public gender: string

  constructor(name: string, age: number, gender?: string) {
    this.name = name
    this.age = age
    this.gender = gender
  }
}

const person = new Human('nana', 10)

const sayHi = (person: Human): string => {
  return `hello ${person.name}, you are ${person.age}, ${person.gender}!!`
}

const data = sayHi(person)
console.log(data)
