<template>
  <div>
    <GeneratorTemplate
      ref="commonTemplate"
      :generate-next-value="nextValue"
    >
      <template v-slot:generatorName>
        <p class="headline">
          NIP
        </p>
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
    GeneratorTemplate
  },
  methods: {
    nextValue () {
      return nipService.nip()
    },

    substituteValue (text) {
      return text.replace(/\$\{nip\}/g, this.$refs.commonTemplate.currentValue())
    }

  }
}
</script>

<style>
</style>
