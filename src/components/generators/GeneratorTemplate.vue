<template>
  <div>
    <v-card class="generator-card">
      <v-container>
        <v-row text-center wrap dense>
          <v-col cols="12" sm="7">
            <v-row dense class="generator-header">
              <v-col cols="8">
                <slot name="generatorName" />
              </v-col>
              <v-col cols="4">
                <slot name="settingsButton" />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12" sm="5">
                <v-btn large color="primary" @click="generateAndCopyToClip">
                  Generuj
                </v-btn>
              </v-col>
              <v-col cols="12" sm="5" style="text-align: end;">
                <slot name="currentSettings" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" @click="clipboardCopy(generatedValue)">
                <v-alert type="success" class="mb-0">
                  {{ generatedValue }}
                </v-alert>
              </v-col>
            </v-row>
          </v-col>

          <v-col class="d-none d-sm-flex ml-auto" sm="5">
            <PreviousValues :previous-values="previousValues" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import PreviousValues from '@/components/common/PreviousValues.vue'
import { EventBus } from '@/services/event-bus.js'

export default {
  components: {
    PreviousValues
  },

  props: {
    generateNextValue: {
      type: Function,
      required: true
    }
  },

  data: () => ({
    previousValues: [],
    generatedValue: null
  }),

  mounted () {
    this.nextValue()
  },

  methods: {
    generateAndCopyToClip () {
      this.generate()
      this.clipboardCopy(this.generatedValue)
    },
    // also called from dashboard when calling all generators
    generate () {
      this.previousValues.unshift(this.generatedValue)
      this.nextValue()
    },
    nextValue () {
      this.generatedValue = this.generateNextValue()
      EventBus.$emit('generated')
    },
    currentValue () {
      return this.generatedValue
    },
    clipboardCopy (text) {
      EventBus.$emit('clicked', text)
    }
  }

}
</script>

<style>
.generator-card {
  min-height: 230px;
}
.generator-header {
  min-height: 58px;
}
</style>
