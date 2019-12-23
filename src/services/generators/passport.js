import utils from '../utils'

export default {
  passport
}

const WEIGHTS = new Map([
  [10, 'A'], [11, 'B'], [12, 'C'], [13, 'D'], [14, 'E'], [15, 'F'], [16, 'G'], [17, 'H'], [18, 'I'],
  [19, 'J'], [20, 'K'], [21, 'L'], [22, 'M'], [23, 'N'], [24, 'O'], [25, 'P'], [26, 'Q'], [27, 'R'],
  [28, 'S'], [29, 'T'], [30, 'U'], [31, 'V'], [32, 'W'], [33, 'X'], [34, 'Y'], [35, 'Z']
])
const NUMBER_WEIGHTS = [1, 7, 3, 1, 7, 3]
const LETTER_WEIGHTS = [7, 3]
const CONTROL_SUM_MODULO = 10

function passport () {
  const firstLetterAsNumber = utils.rand(10, 36)
  const secondLetterAsNumber = utils.rand(10, 36)
  const passportLetterWeightSum = calculatePassportLetterWeightSum(firstLetterAsNumber, secondLetterAsNumber)
  for (;;) {
    const randomPassportNumber = generatePassportNumbers()
    const passportNumberWeightSum = calculatePassportNumberWeightSum(randomPassportNumber)
    const passportWeightSum = passportLetterWeightSum + passportNumberWeightSum
    const passportControlSum = passportWeightSum % CONTROL_SUM_MODULO
    const controlNumber = randomPassportNumber.substring(0, 1)
    if (+controlNumber === +passportControlSum) {
      return `${WEIGHTS.get(firstLetterAsNumber)}${WEIGHTS.get(secondLetterAsNumber)}${randomPassportNumber}`
    }
  }
}

function generatePassportNumbers () {
  return ('0000000' + utils.rand(0, 10000000).toString(10)).slice(-7)
}

function calculatePassportLetterWeightSum (firstLetterAsNumber, secondLetterAsNumber) {
  return (firstLetterAsNumber * LETTER_WEIGHTS[0]) + (secondLetterAsNumber * LETTER_WEIGHTS[1])
}

function calculatePassportNumberWeightSum (randomPassportNumber) {
  const passportNumber = getNumberWithoutControl(randomPassportNumber)
  let passportNumberWeightSum = 0
  for (let i = 0; i < NUMBER_WEIGHTS.length; i++) {
    const numberWeight = passportNumber[i] * NUMBER_WEIGHTS[i]
    passportNumberWeightSum += numberWeight
  }
  return passportNumberWeightSum
}

function getNumberWithoutControl (randomPassportNumber) {
  return randomPassportNumber.substring(1, 7)
}
