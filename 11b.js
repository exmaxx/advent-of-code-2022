import { readLines } from './helpers.js'

const data = readLines('./11.txt')

// Functions

const getMonkey = (data) => {
  const items = data[1].match(/\d+/g)
  const op = data[2].match(/([+*])|\d+|old$/g)
  const test = data[3].match(/\d+/g)
  const [yes] = data[4].match(/\d+/g)
  const [no] = data[5].match(/\d+/g)

  return {
    items: items.map((i) => Number(i)),
    op: [op[0], op[1] === 'old' ? op[1] : Number(op[1])],
    test: Number(test),
    yes: Number(yes),
    no: Number(no),
    inspections: 0,
  }
}

const getMonkeys = (data) => {
  const monkeys = []
  const count = data.length / 7

  for (let i = 0; i < count; i++) {
    monkeys.push(getMonkey(data.splice(0, 6)))
    data.shift()
  }

  return monkeys
}

const playRound = (monkeys) => {
  for (const monkey of monkeys) {
    // console.log('monkeys:', monkeys)
    while (monkey.items.length > 0) {
      monkey.inspections += 1

      const item = monkey.items.shift()
      const operator = monkey.op[0]

      const operand = monkey.op[1] === 'old' ? item : monkey.op[1]

      let newItem = Number(operator === '*' ? item * operand : item + operand)

      // when number is divided by product of its divisors, the remainder for
      // each of them stays the same
      newItem = newItem % magicNumber

      const hasPassed = newItem % monkey.test === Number(0)
      const target = hasPassed ? monkey.yes : monkey.no

      monkeys[target].items.push(newItem)
    }
  }
}

// Main

const monkeys = getMonkeys(data)

// mathematical product of all divisors
const magicNumber = monkeys.reduce((res, m) => {
  return res * m.test
}, 1)

for (let i = 0; i < 10000; i++) {
  playRound(monkeys)
}

monkeys.sort((a, z) => (a.inspections < z.inspections ? 1 : -1))

console.log('monkeys[0].inspections:', monkeys[0].inspections)
console.log('monkeys[1].inspections:', monkeys[1].inspections)
console.log('result', monkeys[0].inspections * monkeys[1].inspections)
