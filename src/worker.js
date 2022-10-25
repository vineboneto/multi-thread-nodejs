const { threadId, parentPort } = require('node:worker_threads')


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve , ms))

parentPort.once('message', async (message) => {
  console.log('threadId: ', threadId)
  let counter = 0

  for (let i = 0; i < 1e1; i++) {
    await sleep(50)
    counter += i
  }

  parentPort.postMessage(counter)
})
