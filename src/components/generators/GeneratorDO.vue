<template>
  <div>
    <GeneratorTemplate ref="commonTemplate" :generate-next-value="nextValue">
      <template v-slot:generatorName>
        <p class="headline">
          Dowód osobisty
        </p>
      </template>
    </GeneratorTemplate>
  </div>
</template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import doService from '@/services/generators/do.js'

export default {
  name: 'GeneratorDO',
  components: {
    GeneratorTemplate
  },
  data: () => ({
    seriaNumer: '',
    seria: '',
    numer: ''
  }),
  methods: {
    nextValue () {
      const result = doService.dowod()
      this.seria = result.seria
      this.numer = result.numer
      this.seriaNumer = result.seriaNumer

      return result.seriaNumer
    },

    substituteValue (text) {
      var result = text.replace(/\$\{dowod\}/g, this.seriaNumer)
      result = result.replace(/\$\{dowodSeria\}/g, this.seria)
      result = result.replace(/\$\{dowodNumer\}/g, this.numer)
      return result
    }
  }

}
</script>

<style>
</style>
