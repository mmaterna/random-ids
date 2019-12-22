<template>
  <v-row text-center wrap dense>
    <v-col cols="12">
      <v-header>Poprzednie wartości</v-header>
      <v-list dense nav class="overflow-y-auto list-width ml-auto" :style="listStyle">
        <v-list-item-group color="primary">
          <v-list-item v-for="(prev, i) in previousValues" :key="i">
            <v-list-item-content>
              <v-list-item-title class="list-item-content" :title="titleFor(prev)" @click="clicked(prev)">
                {{ prev }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { EventBus } from '@/services/event-bus.js'

export default {
  props: {
    previousValues: {
      type: Array,
      required: true
    },
    maxHeight: {
      default: 160,
      required: false,
      type: Number
    }
  },
  computed: {
    listStyle () {
      return 'max-height: ' + this.maxHeight + 'px;'
    }
  },
  methods: {
    clicked (text) {
      EventBus.$emit('clicked', text)
    },
    titleFor (prev) {
      return '' + prev
    }
  }
}
</script>

<style>
.v-list-item--dense, .v-list--dense .v-list-item {
    min-height: 30px;
}
.list-item-content {
 text-align: right;
}

/* Nie dziala dobrze overflow na elementach listy - definiowanie szerokosci dla roznych rozmiarow ekranu */

/* xsmall od 600 (sm i nizej) */
@media screen and (max-width: 599px) {
  .list-width {
    display: none;
  }
}

/* small */
@media screen and (min-width: 601px) and (max-width: 959px) {
  .list-width {
    max-width: 230px;
  }
}

/** medium */
@media screen and (min-width: 960px) and (max-width: 1263px) {
  .list-width {
    max-width: 330px;
  }
}

/** large */
@media screen and (min-width: 1264px) and (max-width: 1903px) {
  .list-width {
    max-width: 230px;
  }
}

/** xlarge */
@media screen and (min-width: 1904px)  {
  .list-width {
    max-width: 320px;
  }
}

</style>
