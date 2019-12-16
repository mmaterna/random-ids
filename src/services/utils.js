export default {
    rand,
    randomLetters,
    log,
    funcExists,
    defaultTemplate
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


function log(text) {
     // eslint-disable-next-line no-console
    console.log(text)
}

function funcExists(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

function defaultTemplate() {
    return `<osoba>
	<pesel>\${pesel}</pesel>
	<do>\${dowod}</do>
	<do-seria>\${dowodSeria}</do-seria>
	<do-numer>\${dowodNumer}</do-numer>
	<nip>\${nip}</nip>
	<regon>\${regon}</regon>
</osoba>`
}