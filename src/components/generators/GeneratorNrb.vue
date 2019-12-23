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
    currentSettings: {
      countryCode: 'PL',
      bankIdConst: '19400008'
    }
  }),

  methods: {
    nextValue () {
      return nrbService.nrb(this.currentSettings.countryCode, this.currentSettings.bankIdConst)
    }
  }
}
</script>

<style>
</style>
