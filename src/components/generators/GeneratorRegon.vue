<template>
  <div>
    <GeneratorTemplate ref="commonTemplate" :generate-next-value="nextValue">
      <template v-slot:generatorName>
        <p class="headline">
          {{ regonTypeString }}
        </p>
      </template>
      <template v-slot:settingsButton>
        <v-switch v-model="currentSettings.regon9" :label="regonTypeString" class="ma-0 pa-0" @change="saveOptions" />
      </template>
    </GeneratorTemplate>
  </div>
</template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import regonService from '@/services/generators/regon.js'
import { mapActions } from 'vuex'

export default {
  name: 'REGON',
  placeholder: 'regon',

  components: {
    GeneratorTemplate
  },

  data: () => ({
    currentSettings: {
      regon9: true
    }
  }),

  computed: {
    regonTypeString () {
      return this.currentSettings.regon9 ? 'Regon 9' : 'Regon 14'
    }
  },

  created () {
    const loadedConfig = this.$store.getters.getGeneratorSettings(this.$options.name)
    if (loadedConfig) {
      this.currentSettings = loadedConfig
    }
  },

  methods: {
    ...mapActions(['updateGeneratorConfiguration']),
    nextValue () {
      return this.currentSettings.regon9 ? regonService.regon9() : regonService.regon14()
    },
    saveOptions () {
      this.updateGeneratorConfiguration({ name: this.$options.name, config: this.currentSettings })
    }
  }

}
</script>

<style>
</style>
