import { Worker } from 'worker_threads'
import { execSync } from 'child_process'

function getCurrentThreadCountWindows() {
  // obtem quantidade de threadds do process e conta
  return parseInt(
    execSync(`((get-process -pid ${process.pid})|select-object  -ExpandProperty Threads | Measure).Count`, {
      shell: 'powershell.exe',
    })?.toString()
  )
}

function thread(data = undefined) {
  const worker = new Worker('./worker.mjs')
  const promise = new Promise((resolve, reject) => {
    worker.once('message', (message) => {
      return resolve(message)
    })
    worker.once('error', reject)
  })
  worker.postMessage(data)
  return promise
}

const nodejsDefaultThreadNumber = getCurrentThreadCountWindows() - 1 // ignora o process

let nodejsThreadCount = 0
const intervalId = setInterval(() => {
  // dessa forma vemos somente as threads que criamos manualmente
  const currentThreads = getCurrentThreadCountWindows() - nodejsDefaultThreadNumber
  if (currentThreads == nodejsThreadCount) return

  nodejsThreadCount = currentThreads
  console.log('threads', nodejsThreadCount)
})

console.log(`Im running`, process.pid, `default threads: ${nodejsDefaultThreadNumber}`)

const results = await Promise.allSettled([
  thread({
    from: 0,
    to: 1e9,
  }),
  thread({
    from: 0,
    to: 1e9,
  }),
  thread({
    from: 0,
    to: 1e5,
  }),
])

console.log(results)

clearInterval(intervalId)
