'use strict'

const fs = require('fs')
const dir = 'log'
const fileName = 'log/server_log.log'

function logMsgSync (msg) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
        console.log('Directory created : ', dir)
    }
    try {
        fs.appendFileSync(fileName, msg + '\n')
        console.log('File appended')
    } catch (err) {
        console.log(err)
    }
}
logMsgSync('This is a test message 1')

function logMsg (msg) {
    fs.stat(dir,
        (err) => {
            if (err == null) {
                console.log('file exits')
            } else if (err.code === 'ENOENT') {
                fs.mkdir(dir,
                    (err) => {
                        if (err) throw err
                        console.log('Directory created : ', dir)
                    }
                )
            }
            fs.appendFile(fileName, msg + '\n',
                (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('File appended')
                    }
                }
            )
        }

    )
}
logMsg('This is a test message 2')
