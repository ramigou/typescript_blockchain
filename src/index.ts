const sayHi = (name: string, age: number, gender: string): string => {
  return `hello ${name}, you are ${age}, ${gender}`
}

const data = sayHi('gildong', 30, 'male')
console.log(data)
