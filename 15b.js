import { readLines } from './helpers.js'

// Functions

const mergeIntervals = (intervals) => {
  if (intervals.length < 2) return intervals

  intervals.sort((a, b) => a[0] - b[0])

  const result = [intervals[0]]

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1]
    const current = intervals[i]

    // Merge intervals that overlap or touch (difference is just 1)
    if (last[1] + 1 >= current[0]) {
      last[1] = Math.max(last[1], current[1])
    } else {
      result.push(current)
    }
  }

  return result
}

const getDistance = (sX, sY, bX, bY) => {
  const distX = getAxisDistance(sX, bX)
  const distY = getAxisDistance(sY, bY)

  return distY + distX
}

const getAxisDistance = (coord1, coord2) => Math.abs(coord1 - coord2)

const getIntervals = (lines, targetY) => {
  const intersections = []

  for (const line of lines) {
    const [sX, sY, bX, bY] = line.match(/-?\d+/g).map(Number)
    const distance = getDistance(sX, sY, bX, bY)
    const targetDistY = getAxisDistance(targetY, sY)
    const remainder = distance - targetDistY

    if (remainder >= 0) {
      intersections.push([sX - remainder, sX + remainder])
    }
  }

  return mergeIntervals(intersections)
}

// Constants

const MIN = 0
const MAX = 4000000

// Main

const lines = readLines('15.txt')

for (let i = MIN; i <= MAX; i++) {
  const intervals = getIntervals(lines, i)

  if (i % 100000 === 0) console.log('processed lines:', i)

  if (intervals.length > 1) {
    const x = intervals[0][1] + 1
    const y = i

    console.log('frequency:', x * MAX + y)

    break
  }
}
