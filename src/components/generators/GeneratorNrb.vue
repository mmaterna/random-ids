<template>

  <div>
    <GeneratorTemplate :generateNextValue="nextValue" ref="commonTemplate">
      <template v-slot:generatorName>
        <p class="headline">NRB</p>
      </template>
    </GeneratorTemplate>    
  </div>
</template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import nrbService from '@/services/generators/nrb.js'

export default {
  name: 'GeneratorNrb',
  components: {
    GeneratorTemplate,
  },
  methods: {
    nextValue() {
      return nrbService.nrb()
    },

    substituteValue(text) {
      return text.replace(/\$\{nrb\}/g, this.$refs.commonTemplate.currentValue());
    }

  },
};
</script>

<style>
</style>