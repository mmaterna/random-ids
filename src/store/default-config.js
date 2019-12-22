/**
 * Default configuration
 */
const defaultConfig = {
  generators: {
    PESEL: {
      age: 40,
      birthDate: null,
      sex: 'male'
    }
  },
  templates: {
    default: `<osoba>
    <pesel>\${pesel}</pesel>
    <do>\${dowod}</do>
    <do-seria>\${dowodSeria}</do-seria>
    <do-numer>\${dowodNumer}</do-numer>
    <nip>\${nip}</nip>
    <regon>\${regon}</regon>
    <nrb>\${nrb}</nrb>
    <uuid>\${uuid}</uuid>
    <passport>\${passport}</passport>
  </osoba>`
  }
}

export default {
  get () {
    return defaultConfig
  }
}
