import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#018786',
        accent: '#03DAC6',
        secondary: '#03DAC6',
        background: '#121212',
        success: '#03DAC6',
        info: '#2196F3',
        warning: '#CF6679',
        error: '#CF6679'
      }
    }
  }
})
