<template>
  <div>
    <GeneratorTemplate
      ref="commonTemplate"
      :generate-next-value="nextValue"
    >
      <template v-slot:generatorName>
        <p class="headline">
          UUID
        </p>
      </template>
    </GeneratorTemplate>
  </div>
</template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import uuidService from '@/services/generators/uuid.js'

export default {
  name: 'GeneratorUUID',
  components: {
    GeneratorTemplate
  },
  methods: {
    nextValue () {
      return uuidService.uuidv4()
    },

    substituteValue (text) {
      return text.replace(/\$\{uuid\}/g, this.$refs.commonTemplate.currentValue())
    }

  }
}
</script>

<style>
</style>
