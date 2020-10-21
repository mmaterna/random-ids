<template>
  <div>
    <GeneratorTemplate ref="commonTemplate" :generate-next-value="nextValue">
      <template v-slot:generatorName>
        <p class="headline">
          NRB
        </p>
      </template>
      <template v-slot:settingsButton>
        <v-btn @click.stop="openSettingsDialog">
          Ustawienia
        </v-btn>
      </template>
    </GeneratorTemplate>
    <!-- settings dialog -->
    <v-dialog
      v-model="dialog"
      max-width="450"
    >
      <v-card>
        <v-card-title class="headline">
          Ustawienia generatora NRB
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid">
            <v-col cols="12">
              <v-radio-group v-model="editedSettings.showCountryCode">
                <template v-slot:label>
                  <div>Czy wyświetlać kod kraju?</div>
                </template>
                <v-radio value="true">
                  <template v-slot:label>
                    <div class="blue--text">
                      Tak
                    </div>
                  </template>
                </v-radio>
                <v-radio value="false">
                  <template v-slot:label>
                    <div class="pink--text text--lighten-2">
                      Nie
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-select v-model="editedSettings.bankId" :items="banks" :value="editedSettings.bankId">
                <template v-slot:label>
                  <div>Jakiego banku rachunek wygenerować?</div>
                </template>
              </v-select>
            </v-col>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="!valid" text color="green darken-1" @click="saveOptions">
            Ustaw
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import nrbService from '@/services/generators/nrb.js'

export default {
  name: 'NRB',
  placeholder: 'nrb',

  components: {
    GeneratorTemplate
  },

  data: () => ({
    dialog: false,
    valid: true,
    currentSettings: {
      showCountryCode: 'false',
      countryCode: 'PL',
      bankId: 1940
    },
    editedSettings: {
      showCountryCode: null,
      countryCode: null,
      bankId: null
    },
    banks: [
      { text: 'Alior Bank', value: 2490 },
      { text: 'Bank Millennium', value: 1160 },
      { text: 'BNP Paribas Bank Polska SA', value: 1750 },
      { text: 'BPH', value: 1060 },
      { text: 'Credit Agricole Bank Polska', value: 1940 },
      { text: 'Idea Bank', value: 1950 },
      { text: 'ING', value: 1050 },
      { text: 'mBank', value: 1140 },
      { text: 'Narodowy Bank Polski', value: 1010 },
      { text: 'Nest Bank', value: 1870 },
      { text: 'Nest Bank 2', value: 2530 },
      { text: 'Pekao', value: 1240 },
      { text: 'PKO BP', value: 1020 },
      { text: 'Santander', value: 1090 },
      { text: 'Societe Generale', value: 1840 },
      { text: 'T-mobile Usługi Bankowe', value: 24901044 }
    ]
  }),

  methods: {
    nextValue () {
      if (this.currentSettings.showCountryCode === 'true') {
        return this.currentSettings.countryCode + nrbService.nrb(this.currentSettings.countryCode, this.currentSettings.bankId)
      } else {
        return nrbService.nrb(this.currentSettings.countryCode, this.currentSettings.bankId)
      }
    },
    openSettingsDialog () {
      this.editedSettings.showCountryCode = this.currentSettings.showCountryCode
      this.editedSettings.countryCode = this.currentSettings.countryCode
      this.editedSettings.bankId = this.currentSettings.bankId
      this.dialog = true
    },
    saveOptions () {
      this.currentSettings.showCountryCode = this.editedSettings.showCountryCode
      this.currentSettings.countryCode = this.editedSettings.countryCode
      this.currentSettings.bankId = this.editedSettings.bankId
      this.dialog = false
    }
  }
}
</script>

<style>
</style>
