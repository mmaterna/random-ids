<template>
  <div>
    <v-card class="generator-card">

      <v-container>
        <v-row text-center wrap dense>

          <v-col cols="12" sm="8">

            <v-row dense class="generator-header">
              <v-col>
                <slot name="generatorName">
                </slot>
              </v-col>
              <v-col>
                <slot name="settingsButton"></slot>
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" sm="5">
                <v-btn x-large @click="generateAndCopyToClip" color="primary">Generuj</v-btn>
              </v-col>
              <v-col cols="12" sm="5" style="text-align: end;">
                <slot name="currentSettings"></slot>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="7" @click="clipboardCopy(generatedValue)">
                <v-alert type="success" class="mb-0">
                  {{ generatedValue }}
                </v-alert>
              </v-col>
            </v-row>
          </v-col>

          <v-col class="d-none d-sm-flex" sm="4">
            <PreviousValues :previousValues="previousValues"/>
          </v-col>
        </v-row>
      </v-container>

    </v-card>

  </div>

</template>

<script>
import PreviousValues from '@/components/common/PreviousValues.vue'
import { EventBus } from '@/services/event-bus.js';

export default {
  name: 'GeneratorTemplate',
  components: {
    PreviousValues,
  },
  props: {
    generateNextValue: {
      type: Function,
      required: true,
    }
  },
  data: () => ({
    previousValues: [],
    generatedValue: null,
  }),

  mounted() {
    this.nextValue();
  },

  methods: {
    generateAndCopyToClip() {
      this.generate()
      this.clipboardCopy(this.generatedValue)
    },
    // also called from dashboard when calling all generators
    generate() {
      this.previousValues.unshift(this.generatedValue)
      this.nextValue()
    },
    nextValue() {
      this.generatedValue = this.generateNextValue()
      EventBus.$emit('generated')
    },
    currentValue() {
      return this.generatedValue;
    },
    clipboardCopy(text) {
      EventBus.$emit('clicked', text)
    },
  },

};
</script>

<style>
.generator-card {
  min-height: 230px;
}
.generator-header {
  min-height: 58px;
}
</style>