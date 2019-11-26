<template>
  <div>
    <GeneratorTemplate :generateNextValue="nextValue" ref="commonTemplate">
      <template v-slot:generatorName>
        <p class="headline">{{regonType}}</p>
      </template>
      <template v-slot:settingsButton>
        <v-switch v-model="regon14" :label="`${regonType}`" class="ma-0 pa-0"></v-switch>        
      </template>
    </GeneratorTemplate>    
  </div>
 </template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import regonService from '@/services/generators/regon.js'

export default {
  name: 'GeneratorRegon',
  components: {
    GeneratorTemplate,
  },
  computed: {
    regonType() {
      if (this.regon14) {
        return "Regon 14"
      } else {
        return "Regon 9"
      }
    }
  },
  methods: {
    nextValue() {
      if (this.regon14) {
        return regonService.regon14()
      } else {
        return regonService.regon9()
      }
    },
  },

  data: () => ({
    regon14: false,
  }),
};
</script>

<style>
</style>