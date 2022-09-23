const fs = require('fs')
let timer = null

fs.watch('.git', { recursive: true }, (eventType, fileName) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    const head = fs.readFileSync('.git/HEAD', { encoding: 'UTF-8' })
    const headPath = head.match(/(refs\/heads\/[\S]+)/)
    const headFileName = `.git/${headPath[1]}`
    console.log('HEAD is: ', head)
    if (fs.existsSync(headFileName)) {
      console.log(`${headPath[1]}: `, fs.readFileSync(headFileName, { encoding: 'UTF-8' }))
    }
    console.log('--------------------------------------------')
  })
  console.log('\nThe File', fileName, 'was modified, eventType is: ', eventType)
})
