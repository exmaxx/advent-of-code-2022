import { readLines, writeText } from './helpers.js'

// Functions

const parseRocks = (rocks) =>
  rocks.match(/\d+,\d+/g).map((val) => val.split(',').map(Number))

const applyCoords = (coords) => {
  for (let i = 0; i < coords.length - 1; i++) {
    const from = coords[i]
    const to = coords[i + 1]

    addLine(from, to)
  }
}

const addLine = (from, to) => {
  // Ensure we add live from top to bottom or from left to right
  if (from[1] - to[1] > 0 || from[0] - to[0] > 0) {
    addLine(to, from)
    return
  }

  const isHorizontal = from[1] === to[1]

  if (isHorizontal) {
    const length = Math.abs(from[0] - to[0]) + 1

    for (let i = 0; i < length; i++) {
      addChar([from[0] + i, from[1]], '#')
    }
  } else {
    const length = Math.abs(from[1] - to[1]) + 1

    for (let i = 0; i < length; i++) {
      addChar([from[0], from[1] + i], '#')
    }
  }

  if (from[1] > maxY) maxY = from[1]
  if (to[1] > maxY) maxY = to[1]
}

const addChar = ([x, y], char) => {
  if (!area[y]) area[y] = []
  area[y][x] = char
}

const move = () => {
  if (y < maxY + 1) {
    if (area[y + 1]?.[x] === undefined) {
      y++
      return true
    } else if (area[y + 1]?.[x - 1] === undefined) {
      y++
      x--
      return true
    } else if (area[y + 1]?.[x + 1] === undefined) {
      y++
      x++
      return true
    }
  }

  return false
}

// Global

const area = []
let maxY = 0
let x = 500
let y = 0
let count = 0

// Main

const lines = readLines('./14.txt')

for (const rocks of lines) {
  const coords = parseRocks(rocks)
  applyCoords(coords)
}

// Init starting line
if (!area[0]) area[0] = []

while (true) {
  const hasMoved = move()

  if (!hasMoved) {
    if (x === 500 && y ===0) {
      addChar([x, y], 'o')
      count++
      break
    }

    addChar([x, y], 'o')
    x = 500
    y = 0
    count++
  }
}

console.log('count:', count)

// Debug
writeText(
  '14-out.txt',
  area
    .map((line) => [...line].map((char) => char || '.').join('') + '\n')
    .join('')
)
