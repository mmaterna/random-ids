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
import utils from '@/services/utils.js'

export default {
  name: 'DO',

  components: {
    GeneratorTemplate
  },

  data: () => ({
    placeholder: 'dowod',
    seria: '',
    numer: ''
  }),

  methods: {
    nextValue () {
      const result = doService.dowod()
      this.seria = result.seria
      this.numer = result.numer

      return result.seriaNumer
    },
    substituteValue (text) {
      var result = utils.replaceAll(text, this.placeholder, this.$refs.commonTemplate.currentValue())
      // dodatkowe placeholdery
      result = utils.replaceAll(result, 'dowodSeria', this.seria)
      result = utils.replaceAll(result, 'dowodNumer', this.numer)
      return result
    }
  }

}
</script>

<style>
</style>
