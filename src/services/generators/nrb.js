import utils from '../utils.js'

export default {
  nrb
}

function nrb (countryCode, bankId) {
  const randomlyGeneratedPart = utils.rand(1000000000000000, 9999999999999999)
  bankId = joinBankNumber(bankId)
  const controlNumber = calculateProperControlNumber(countryCode, bankId, randomlyGeneratedPart)
  return controlNumber + '' + bankId + '' + randomlyGeneratedPart
}

function calculateProperControlNumber (countryCode, bankId, randomlyGeneratedPart) {
  const baseControlNumber = '00'
  const tempNumber = bankId + randomlyGeneratedPart + countryCode + baseControlNumber
  const numberTranslated = translateLettersToNumbers(tempNumber)
  const mod = modulo(numberTranslated, 97)
  if (mod !== 1) {
    if ((98 - mod) < 10) {
      return '' + 0 + 98 - mod
    } else {
      return 98 - mod
    }
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

function modulo (dividend, divisor) {
  const partLength = 10
  while (dividend.length > partLength) {
    const part = dividend.substring(0, partLength)
    dividend = (part % divisor) + dividend.substring(partLength)
  }
  return dividend % divisor
}

function joinBankNumber (bankId) {
  if (bankId.toString().length !== 8) {
    return bankId + '000' + bankIdControlNumber(bankId)
  } else {
    return bankId
  }
}

function bankIdControlNumber (bankId) {
  const weights = [3, 9, 7, 1]
  bankId = bankId.toString().split('').map(Number)
  let sum = 0
  for (let i = 0; i < 4; i++) {
    sum = sum + (weights[i] * bankId[i])
  }
  const lastDigit = modulo(sum, 10)
  return lastDigit === 0 ? 0 : 10 - lastDigit
}
