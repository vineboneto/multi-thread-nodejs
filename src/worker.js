const { threadId, parentPort } = require('node:worker_threads')
const prisma = require('./db')

parentPort.once('message', async (message) => {
  console.log('threadId: ', threadId)
  let counter = 0

  for (let i = 0; i < 1e1; i++) {
    const data = await prisma.tbl_temp.count()
    counter += data
  }

  parentPort.postMessage(counter)
})
