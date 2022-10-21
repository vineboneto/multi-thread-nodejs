const { execSync } = require('node:child_process')

function getCurrentThreadCountWindows() {
  // Obtém quantidade de threads do process e conta
  const script = `((get-process -pid ${process.pid})|select-object  -ExpandProperty Threads | Measure).Count`
  return parseInt(execSync(script, { shell: 'powershell.exe' })?.toString())
}

const nodejsDefaultThreadNumber = getCurrentThreadCountWindows() - 1 // ignora o process

let nodejsThreadCount = 0
const intervalId = setInterval(() => {
  // Dessa forma vemos somente as threads que criamos manualmente
  const currentThreads = getCurrentThreadCountWindows() - nodejsDefaultThreadNumber
  if (currentThreads == nodejsThreadCount) return

  nodejsThreadCount = currentThreads
  console.log('current threads', nodejsThreadCount)
})

console.log(`Im running`, process.pid, `default threads: ${nodejsDefaultThreadNumber}`)

module.exports = intervalId
