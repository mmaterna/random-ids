import utils from '../utils.js'

export default {
  nip
}

function nip () {
  var nipStr = ('000000000' + utils.rand(0, 1000000000).toString(10)).slice(-9)
  var weights = [6, 5, 7, 2, 3, 4, 5, 6, 7]
  var sum = 0; var i
  for (i = 0; i < weights.length; i += 1) {
    sum += weights[i] * (+nipStr.charAt(i))
  }
  sum = sum % 11
  if (sum === 10) {
    // niepoprawny numer, trzeba wygenerowac nowy
    return this.nip()
  } else {
    return nipStr + sum.toString(10)
  }
}
