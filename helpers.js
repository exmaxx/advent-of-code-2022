import { readFileSync } from 'node:fs'

export const readLines = (path) => {
  const lines = readFileSync(path).toString().split('\n')

  if (lines[lines.length - 1] === '') lines.pop()

  return lines
}
