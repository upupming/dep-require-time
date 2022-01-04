import chalk from 'chalk'
import { performance } from 'perf_hooks'
export const measureRequireTime = (id: string) => {
  const start = performance.now()
  try {
    require(require.resolve(id, {
      paths: [process.cwd()]
    }))
  } catch (err: any) {
    if (err.code === 'ERR_REQUIRE_ESM') {
      console.warn(chalk.yellow('skipping type=module package:', id))
    } else {
      console.warn(chalk.yellow('unknown error, skipping package:', id))
    }
    return -1
  }
  const end = performance.now()
  return end - start
}

export const measureDeps = (ids: string[]) => {
  return ids.map((id, idx) => ({
    id,
    time: measureRequireTime(id)
  } as const)).sort((a, b) => -(a.time - b.time)).map(({ id, time }) => ({ id, 'time (ms)': Number(time.toFixed(2)) }))
}

export const measureTask = (taskName: string, ids: string[]) => {
  console.log(`require time of ${chalk.cyan(taskName)}:`)
  console.table(measureDeps(ids.filter(id => !id.startsWith('@types/'))))
  console.log()
}
