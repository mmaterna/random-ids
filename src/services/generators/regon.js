import utils from '../utils.js'

export default {
  regon9, regon14
}

function regon9 () {
  var firstHalf = ('00000' + utils.rand(0, 100000).toString(10)).slice(-5)
  var secondHalf = ('000' + utils.rand(0, 1000).toString(10)).slice(-3)
  var rawRegon = firstHalf + secondHalf
  var weights = [8, 9, 2, 3, 4, 5, 6, 7]
  var sum = 0; var i
  for (i = 0; i < weights.length; i += 1) {
    sum += weights[i] * (+rawRegon.charAt(i))
  }
  sum = (sum % 11) % 10
  return rawRegon + sum.toString(10)
}

function regon14 () {
  var firstHalf = regon9()
  var secondHalf = ('0000' + utils.rand(0, 10000).toString(10)).slice(-4)
  var rawRegon = firstHalf + secondHalf
  var weights = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8]
  var sum = 0; var i
  for (i = 0; i < weights.length; i += 1) {
    sum += weights[i] * (+rawRegon.charAt(i))
  }
  sum = (sum % 11) % 10
  return rawRegon + sum.toString(10)
}
