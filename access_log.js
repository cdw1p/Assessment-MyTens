const fs = require('fs')
const { hideBin } = require('yargs/helpers')
const argv = require('yargs/yargs')(hideBin(process.argv)).argv

// Read File
async function readFile(filePath) {
  try {
    return {
      success: true,
      data: (await fs.readFileSync(filePath, 'utf-8'))
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    }
  }
}

// Write File
async function writeFile(filePath, extension, data) {
  try {
    const fileName = filePath.split('/').pop()
    const dataFormat = extension === 'txt' ? data : JSON.stringify(data, null, 4)
    const fileOutput = fileName.match(/\./g) ? filePath : `${filePath}/log.${extension}`
    await fs.writeFileSync(fileOutput, dataFormat)
    return {
      success: true,
      data: fileOutput
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    }
  }
}

// Convert Log to JSON Format
async function convertToJSON(data) {
  // format log : ip - - [date] "method url protocol" http_status, size
  // ::1 - - [18/Mar/2021:09:23:58 +0700] "GET /phpmyadmin/ HTTP/1.1" 404 196
  const tempArrayData = []
  const arrayData = data.split(/\r?\n/)
  for (dataLog of arrayData) {
    const [ip, , , date, time, method, url, protocol, http_status, size] = dataLog.split(' ')
    if (http_status) {
      tempArrayData.push({
        ip, date, time, method, url, protocol, http_status, size
      })
    }
  }
  return tempArrayData
}

// Help Command
async function helpCommand() {
  console.log(`RULES :\n- default convertion format is "PLAIN TEXT"\n\nCOMMAND LINE ARGUMENT : node filename.js <path_source> -flag\n-o\twrite an output file\n-t\ttype of file convert (json or text)\n\nEXAMPLE :\ndefault command\t\tnode access_log /var/log/apache2/access_log\nwith output file\tnode access_log /var/log/apache2/access_log -o /User/johnmayer/Desktop/apachelog.json\nwith json output\tnode access_log /var/log/apache2/access_log -t json\nwith plain output\tnode access_log /var/log/apache2/access_log -t text`)
}

// Main Function
;(async () => {
  try {
    // Argv Parsing
    const help = argv.h, type = argv.t, [node, file, input] = process.argv, output = argv.o
    if (help || !(input)) {
      helpCommand()
    } else {
      const convertionExt = type === 'json' ? type : 'txt'
      const outputFiles = output ? output : '/Users/cahyodwi/Desktop'
      const result = await readFile(input)
      if (result.success) {
        // Regex Match File Log
        if (input.match(/^\/var\/log\/apache2\/access_log$/g)) {
          // Validation Type of File Convertion
          if (type && !(['text', 'json'].includes(type))) {
            throw new Error('Type of file convertion not found')
          }
          let resultData = result.data
          if (convertionExt === 'json') {
            resultData = await convertToJSON(resultData)
          }
          const resWriteFile = await writeFile(outputFiles, convertionExt, resultData)
          if (resWriteFile.success) {
            console.log(`Yeaay!! log already writing at "${resWriteFile.data}" `)
          } else {
            throw new Error(resWriteFile.message)
          }
        } else {
          throw new Error(`This tool only for parsing apache access log`)
        }
      } else {
        throw new Error(`File "${input}" is not found`)
      }
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`)
  }
})()