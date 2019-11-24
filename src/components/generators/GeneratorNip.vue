<template>

  <div>
    <GeneratorTemplate :generateNextValue="nextValue">
      <template v-slot:generatorName>
        <p class="headline">NIP</p>
      </template>
    </GeneratorTemplate>    
  </div>
</template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import nipService from '@/services/generators/nip.js'

export default {
  name: 'GeneratorNip',
  components: {
    GeneratorTemplate,
  },
  methods: {
    nextValue() {
      return nipService.nip()
    },
  },
};
</script>

<style>
</style>