import utils from '../utils.js'

export default {
  nrb
}

const countryCode = 'PL'
let controlNubmer
const bankIdConst = '19400008'
let randomlyGeneratedPart

function nrb () {
  controlNubmer = '00'
  randomlyGeneratedPart = utils.rand(1000000000000000, 9999999999999999)
  calulateProperControlNumber()
  return countryCode + controlNubmer + bankIdConst + randomlyGeneratedPart
}

function calulateProperControlNumber () {
  let number = bankIdConst + randomlyGeneratedPart + countryCode + controlNubmer
  number = translateLettersToNumbers(number)
  const modulo = modulomator(number, 97)
  if (modulo != 1) {
    controlNubmer = 98 - modulo
  }

  function translateLettersToNumbers (iban) {
    let sb = ''
    for (const ch in iban) {
      const chat = iban.charCodeAt(ch)
      if (chat < 64) {
        sb += iban[ch]
      } else {
        sb += chat - 55
      }
    }
    return sb
  }

  function modulomator (divident, divisor) {
    const partLength = 10
    while (divident.length > partLength) {
      const part = divident.substring(0, partLength)
      divident = (part % divisor) + divident.substring(partLength)
    }
    return divident % divisor
  }
}
