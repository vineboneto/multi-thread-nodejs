import { threadId, parentPort } from 'worker_threads'

parentPort.once('message', ({ from, to }) => {
  console.time(`benchmark-${threadId}`)
  let count = 0
  for (let i = from; i < to; i++) {
    count++
  }
  console.timeEnd(`benchmark-${threadId}`)

  parentPort.postMessage(`thread id: ${threadId}, total count ${count}`)
})
