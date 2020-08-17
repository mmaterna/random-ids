<template>
  <div>
    <GeneratorTemplate ref="commonTemplate" :generate-next-value="nextValue">
      <template v-slot:generatorName>
        <p class="headline">
          NRB
        </p>
      </template>
    </GeneratorTemplate>
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
      { text: 'Credit Agricole Bank Polska', value: 1940 },
      { text: 'Narodowy Bank Polski', value: 1010 },
      { text: 'PKO BP', value: 1020 },
      { text: 'ING', value: 1050 },
      { text: 'BPH', value: 1060 },
      { text: 'Santander', value: 1090 },
      { text: 'mBank', value: 1140 },
      { text: 'Bank Millennium', value: 1160 },
      { text: 'Pekao', value: 1240 },
      { text: 'BNP Paribas Bank Polska SA', value: 1750 },
      { text: 'Societe Generale', value: 1840 },
      { text: 'Nest Bank', value: 1870 },
      { text: 'Idea Bank', value: 1950 },
      { text: 'Alior Bank', value: 2490 }
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
