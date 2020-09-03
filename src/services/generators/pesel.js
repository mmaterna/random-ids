import utils from '../utils.js'

export default {
  pesel
}

function pesel (birthDate, age, sex) {
  const birth = prepareBirthday(birthDate, age)
  return generatePesel(birth, sex)
}

function generatePesel (birthDateStr, sex) {
  const [year, month, day] = birthDateStr.split('-')

  const century = Math.floor(year / 100)
  const monthOffset = getMonthOffsetForPesel(century)
  const monthWithOffset = parseInt(month) + parseInt(monthOffset)

  var randomPart = utils.rand(0, 9999)

  if (sex === 'male' && (randomPart % 2 === 0)) {
    randomPart++
  } else if (sex === 'female' && randomPart % 2 === 1) {
    randomPart++
  }
  const fourRandomDigits = ('0000' + randomPart.toString(10)).slice(-4)

  var rawPesel = last2Digits(year) +
        last2Digits(monthWithOffset) +
        last2Digits(day) +
        fourRandomDigits
  var controlDigit = computePeselControlDigit(rawPesel)
  return rawPesel.concat(controlDigit)
}

function prepareBirthday (birthDateStr, age) {
  if (birthDateStr != null && (typeof birthDateStr === 'string') && /^\d\d\d\d-\d\d-\d\d$/.test(birthDateStr)) {
    return birthDateStr
  }
  if (age && age >= 1 && age <= 99) {
    const year = new Date().getFullYear() - age
    const month = utils.rand(1, new Date().getMonth() + 1)
    let day
    if (month !== new Date().getMonth() + 1) {
      day = utils.rand(1, daysInMonth(year, month) + 1)
    } else {
      day = utils.rand(1, new Date().getDate())
    }
    return `${year}-${month}-${day}`
  } else {
    const currentYear = new Date().getFullYear()
    const year = utils.rand(currentYear - 80, currentYear - 1)
    const month = utils.rand(1, 13)
    const day = utils.rand(1, daysInMonth(year, month) + 1)
    return `${year}-${month}-${day}`
  }
}

function daysInMonth (year, month) {
  // 0 dzien nastepnego miesiaca (miesiace indeksowane od 0, czyli dla argumentu 1 (w znaczeniu styczen) bierze 0 dzien lutego (0-styczen, 1-luty))
  return new Date(year, month, 0).getDate()
}

function last2Digits (number) {
  var n = Math.floor(number % 100)
  return ('00' + n.toString(10)).slice(-2)
}

var computePeselControlDigit = function (rawPesel) {
  var peselDigits = rawPesel.split('').map(function (d) { return +d })
  var weigths = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]

  var sum1 = 0; var i
  for (i = 0; i < weigths.length; i += 1) {
    sum1 += weigths[i] * peselDigits[i]
  }
  sum1 = (10 - (sum1 % 10)) % 10
  return sum1
}

function getMonthOffsetForPesel (century) {
  switch (century) {
    case 18: return 80
    case 19: return 0
    case 20: return 20
    case 21: return 40
    case 22: return 60
  }
}
