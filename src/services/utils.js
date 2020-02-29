export default {
  rand,
  randomLetters,
  log,
  funcExists,
  stringPropertyExists,
  replaceAll,
  isDateValid
}

function rand (min, max) {
  return min + Math.floor((max - min) * Math.random())
}

function randomLetters (length) {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function log (text, argument = '') {
  // eslint-disable-next-line no-console
  console.log(text, argument)
}

function funcExists (functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

function stringPropertyExists (prop) {
  return prop && (typeof prop === 'string' || prop instanceof String)
}

function replaceAll (text, key, replacement) {
  const regexp = '\\$\\{' + key + '\\}'
  /* eslint no-template-curly-in-string: "error" */
  return text.replace(new RegExp(regexp, 'g'), replacement)
}

function isDateValid (dateString) {
  // Parse the date parts to integers
  var parts = dateString.split('-')
  var year = parseInt(parts[0], 10)
  var month = parseInt(parts[1], 10)
  var day = parseInt(parts[2], 10)

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month === 0 || month > 12) {
    return false
  }
  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1]
}
