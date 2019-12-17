export default {
    rand,
    randomLetters,
    log,
    funcExists
}

function rand (min, max) {
    return min + Math.floor((max - min) * Math.random())
}

function randomLetters(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function log(text, argument = "") {
     // eslint-disable-next-line no-console
     console.log(text, argument)
}

function funcExists(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}
