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
  name: 'UUID',
  placeholder: 'uuid',

  components: {
    GeneratorTemplate
  },

  methods: {
    nextValue () {
      return uuidService.uuidv4()
    }
  }
}
</script>

<style>
</style>
