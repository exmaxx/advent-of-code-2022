import { readLines } from './helpers.js'

// Functions

const findCharPosition = (data, char) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === char) return [i, j]
    }
  }
}

const isTooHigh = (a, b) => (b.charCodeAt(0) - a.charCodeAt(0)) > 1

const canWalk = (cur, next) => {
  if (!cur || !next) return false

  const curElev = map[cur[0]]?.[cur[1]]
  let nextElev = map[next[0]]?.[next[1]]

  if (!nextElev) return false
  if (nextElev === 'E') nextElev = 'z' // replace end

  const nextTrack = track[next[0]][next[1]]

  if (nextTrack !== '.') return false

  return !isTooHigh(curElev, nextElev)
}

const walk = (y, x, step) => {
  track[y][x] = step

  if (canWalk([y, x], [y, x - 1])) queue.push([y, x - 1, step + 1])
  if (canWalk([y, x], [y, x + 1])) queue.push([y, x + 1, step + 1])
  if (canWalk([y, x], [y - 1, x])) queue.push([y - 1, x, step + 1])
  if (canWalk([y, x], [y + 1, x])) queue.push([y + 1, x, step + 1])
}

const main = () => {
  const [y, x] = findCharPosition(map, 'S')

  // replace start
  map[y] = map[y].replace('S', 'a')

  queue.push([y, x, 0])

  while (queue.length > 0) {
    const [y, x, step] = queue.shift()

    if (track[y][x] !== '.') continue

    if (map[y][x] === 'E') {
      console.log('step:', step)
      break
    }

    walk(y, x, step)
  }
}

// Main

const map = readLines('./12.txt')
const width = map[0].length
const height = map.length
const track = [...Array(height)].map(() => Array(width).fill('.'))
const queue = []

main()
