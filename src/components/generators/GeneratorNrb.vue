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

  components: {
    GeneratorTemplate
  },

  data: () => ({
    placeholder: 'nrb'
  }),

  methods: {
    nextValue () {
      return nrbService.nrb()
    }
  }
}
</script>

<style>
</style>
