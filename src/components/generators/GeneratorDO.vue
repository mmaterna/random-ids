<template>
  <div>
    <GeneratorTemplate :generateNextValue="nextValue" ref="commonTemplate">
      <template v-slot:generatorName>
        <p class="headline">Dowód osobisty</p>
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
    GeneratorTemplate,
  },
  methods: {
    nextValue() {
      return doService.dowod()
    },
  },

};
</script>

<style>
</style>