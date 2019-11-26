<template>
  <v-row text-center wrap dense>
    <v-col cols="12">
      <h4>Poprzednie wartości</h4>
      <v-list dense class="overflow-y-auto" :style="listStyle">
        <v-list-item-group color="primary">
          <v-list-item v-for="(prev, i) in previousValues" :key="i">
            <v-list-item-content>
              <v-list-item-title @click="clicked(prev)">{{prev}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { EventBus } from '@/services/event-bus.js';

export default {
  props: {
    previousValues: {
      type: Array,
      required: true
    },
    maxHeight: {
        default: 160,
        required: false,
        type: Number,
    }
  },
  methods: {
    clicked(text) {
      EventBus.$emit('clicked', text)
    }
  },
  computed: {
      listStyle() {
        return "max-height: " + this.maxHeight + "px;"
      }
  }
}
</script>

<style>
</style>