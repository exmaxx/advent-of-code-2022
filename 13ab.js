import { readLines } from './helpers.js'

// Functions

/**
 * 1 is good
 * -1 is bad
 * 0 is neutral - continue
 */
const compare = (a, b) => {
  if (typeof a === 'number' && typeof b === 'number') {
    if (a === b) return 0
    if (a < b) return 1
    if (a > b) return -1
  }

  if (typeof a === 'number' && typeof b === 'object') {
    return compare([a], b)
  }

  if (typeof a === 'object' && typeof b === 'number') {
    return compare(a, [b])
  }

  if (typeof a === 'object' && typeof b === 'object') {
    while (a.length) {
      const valA = a.shift()
      const valB = b.shift()

      if (valB === undefined) return -1

      const res = compare(valA, valB)

      if (res !== 0) return res
    }

    if (b.length) return 1
    else return 0
  }
}

const isPairValid = (first, second) => {
  return compare(JSON.parse(first), JSON.parse(second)) > 0
}

// Main

const packets = readLines('./13.txt')

let sum = 0

for (let i = 0; i < packets.length / 3; i++) {
  const isValid = isPairValid(packets[i * 3], packets[i * 3 + 1])

  if (isValid) sum += i + 1
}

console.log('part 1:', sum)

packets.push('[[2]]', '[[6]]')

const sorted = packets
  .filter((p) => p !== '')
  .sort((a, z) => -1 * compare(JSON.parse(a), JSON.parse(z)))

const divider2 = sorted.findIndex((val) => val === '[[2]]') + 1
const divider6 = sorted.findIndex((val) => val === '[[6]]') + 1

console.log('part 2:', divider2 * divider6)
