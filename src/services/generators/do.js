import utils from '../utils.js'

export default {
  dowod
}

function dowod () {
  const serial = utils.randomLetters(3)
  const numbers = ('00000' + utils.rand(0, 99999).toString()).slice(-5)
  const controlDigit = calculateControlDigit(serial, numbers)
  const seriaNumer = serial + controlDigit + numbers
  return {
    seria: serial,
    numer: '' + controlDigit + numbers,
    seriaNumer: seriaNumer
  }
}

var letterValues = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  I: 18,
  J: 19,
  K: 20,
  L: 21,
  M: 22,
  N: 23,
  O: 24,
  P: 25,
  Q: 26,
  R: 27,
  S: 28,
  T: 29,
  U: 30,
  V: 31,
  W: 32,
  X: 33,
  Y: 34,
  Z: 35
}

function calculateControlDigit (serial, numbers) {
  var controlDigit =
    7 * letterValues[serial[0]] +
    3 * letterValues[serial[1]] +
    1 * letterValues[serial[2]] +
    7 * numbers[0] +
    3 * numbers[1] +
    1 * numbers[2] +
    7 * numbers[3] +
    3 * numbers[4]
  var controlDigitLastDigit = controlDigit % 10
  return controlDigitLastDigit
}
