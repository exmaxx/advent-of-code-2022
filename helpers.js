import { readFileSync } from 'node:fs'

export const readLines = (path) => readFileSync(path).toString().split('\n')
