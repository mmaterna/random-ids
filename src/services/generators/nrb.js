import utils from '../utils.js'

export default {
  nrb
}

function nrb (countryCode, bankId) {
  const randomlyGeneratedPart = utils.rand(1000000000000000, 9999999999999999)
  const controlNubmer = calulateProperControlNumber(countryCode, bankId, randomlyGeneratedPart)
  return countryCode + controlNubmer + bankId + randomlyGeneratedPart
}

function calulateProperControlNumber (countryCode, bankId, randomlyGeneratedPart) {
  const baseControlNumber = '00'
  const tempNumber = bankId + randomlyGeneratedPart + countryCode + baseControlNumber
  const numberTranslated = translateLettersToNumbers(tempNumber)
  const modulo = modulomator(numberTranslated, 97)
  if (modulo !== 1) {
    return 98 - modulo
  }
  return baseControlNumber
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
