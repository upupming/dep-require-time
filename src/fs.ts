import fs from 'fs'
import { resolve } from 'path'

export function getPackageJSON(cwd = process.cwd()): any {
  const path = resolve(cwd, 'package.json')

  if (fs.existsSync(path)) {
    try {
      const raw = fs.readFileSync(path, 'utf-8')
      const data = JSON.parse(raw)
      return data
    }
    catch (e) {
      console.warn('Failed to parse package.json')
      process.exit(0)
    }
  } else {
    console.warn('No package.json found')
    process.exit(0)
  }
}
