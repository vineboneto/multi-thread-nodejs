const { Worker } = require('node:worker_threads')
const path = require('node:path')
const intervalId = require('./debug')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function createThread(data = undefined) {
  const worker = new Worker(path.join(__dirname, 'worker.js'))
  const promise = new Promise((resolve, reject) => {
    worker.once('message', (message) => resolve(message))

    worker.once('error', reject)
  })
  worker.postMessage(data)
  return promise
}

async function createPromise() {
  const promise = new Promise(async (resolve, reject) => {
    let counter = 0
    for (let i = 0; i < 1e1; i++) {
      await sleep(50)
      counter += i
    }
    resolve(counter)
  })

  return promise
}

async function monoThread() {
  let counter = 0

  console.time()
  for (let i = 0; i < 1e1; i++) {
    await sleep(50)
    counter += i
  }
  for (let i = 0; i < 1e1; i++) {
    await sleep(50)
    counter += i
  }
  for (let i = 0; i < 1e1; i++) {
    await sleep(50)
    counter += i
  }

  console.log(counter)
  console.timeEnd()
}

async function monoThreadWithPromise() {
  console.time()
  const promises = new Array(3).fill(0).map((_) => createPromise())
  const res = await Promise.all(promises)
  const total = res.reduce((p, c) => p + c, 0)
  console.log(total)
  console.timeEnd()
}

async function multiThread() {
  console.time()
  const threads = new Array(3).fill(0).map((_) => createThread())
  const res = await Promise.all(threads)
  const total = res.reduce((p, c) => p + c, 0)
  console.log(total)
  console.timeEnd()
}

async function main(exec) {
  switch (exec) {
    case 'mono':
      await monoThread()
      break
    case 'promise':
      await monoThreadWithPromise()
      break
    case 'thread':
      await multiThread()
      break
    default:
      throw new Error('Invalid type execution')
  }
  clearInterval(intervalId)
}

const execType =
  process.argv.find((e) => e === '--promise' || e === '--mono' || e === '--thread')?.replace(/\-/g, '') || 'thread'

console.log(execType)

main(execType)
