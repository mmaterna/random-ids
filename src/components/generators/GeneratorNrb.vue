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
      bankIdConst: '19400008'
    },
    editedSettings: {
      showCountryCode: null,
      countryCode: null,
      bankIdConst: null
    }
  }),

  methods: {
    nextValue () {
      if (this.currentSettings.showCountryCode === 'true') {
        return this.currentSettings.countryCode + nrbService.nrb(this.currentSettings.countryCode, this.currentSettings.bankIdConst)
      } else {
        return nrbService.nrb(this.currentSettings.countryCode, this.currentSettings.bankIdConst)
      }
    },
    openSettingsDialog () {
      this.editedSettings.showCountryCode = this.currentSettings.showCountryCode
      this.editedSettings.countryCode = this.currentSettings.countryCode
      this.editedSettings.bankIdConst = this.currentSettings.bankIdConst
      this.dialog = true
    },
    saveOptions () {
      this.currentSettings.showCountryCode = this.editedSettings.showCountryCode
      this.currentSettings.countryCode = this.editedSettings.countryCode
      this.currentSettings.bankIdConst = this.editedSettings.bankIdConst
      this.dialog = false
    }
  }
}
</script>

<style>
</style>
