<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Szablon</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-textarea v-model="templateText" rows="15" @change="saveChangedTemplate" />
                </v-col>
                <v-col cols="12" lg="6">
                  <v-textarea :value="templateTextResult" rows="15" readonly="readonly" @click="copyTemplateTextResult" />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="generator in activeGenerators" :key="generator.type._uid" cols="12" :lg="generator.size">
        <component :is="generator.type" ref="generator" />
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top :timeout="snackbarTimeout">
      Skopiowano do schowka...
    </v-snackbar>
  </v-container>
</template>

<script>
import GeneratorPesel from './generators/GeneratorPesel.vue'
import GeneratorNip from './generators/GeneratorNip.vue'
import GeneratorRegon from './generators/GeneratorRegon.vue'
import GeneratorDO from './generators/GeneratorDO.vue'
import GeneratorNrb from './generators/GeneratorNrb'
import GeneratorUUID from './generators/GeneratorUUID'
import GeneratorPassport from './generators/GeneratorPassport.vue'
import utils from '@/services/utils.js'
import clipboard from '@/services/clipboard.js'
import { EventBus } from '@/services/event-bus.js'
import { mapActions, mapGetters } from 'vuex'

export default {
  allGenerators: [
    { type: GeneratorPesel, size: 6 },
    { type: GeneratorDO, size: 6 },
    { type: GeneratorNip, size: 6 },
    { type: GeneratorRegon, size: 6 },
    { type: GeneratorPassport, size: 6 },
    { type: GeneratorNrb, size: 6 },
    { type: GeneratorUUID, size: 6 }
  ],

  data: () => ({

    snackbar: false,
    snackbarTimeout: 600,

    templateText: '',
    templateTextResult: ''
  }),

  computed: {
    validGenerators () {
      return this.$options.allGenerators.filter(g => utils.stringPropertyExists(g.type.name))
    },
    activeGenerators () {
      return this.validGenerators
    }
  },

  // right after creation
  created () {
    this.loadConfiguration()
    // podstawienie domyslnego szablonu
    this.templateText = this.getAllTemplates().default
  },

  mounted () {
    EventBus.$on('clicked', someData => this.clipboardCopy(someData))
    EventBus.$on('generated', () => this.calculateTemplateResult())

    // pierwsze przegenerowanie szablonu
    this.calculateTemplateResult()
  },

  methods: {
    ...mapActions(['loadConfiguration', 'updateTemplateConfiguration']),
    ...mapGetters(['getAllTemplates']),

    refreshAll () {
      // call generate from template generator in every generator component
      if (this.$refs.generator) {
        this.$refs.generator.forEach(g => g.$refs.commonTemplate.generate())
      }
      this.calculateTemplateResult()
    },
    calculateTemplateResult () {
      // podmien wartosci
      var textTemplate = this.templateText
      if (this.$refs.generator) {
        this.$refs.generator.forEach(g => {
          if (utils.funcExists(g.substituteValue)) {
            // generator ma specyficzna funkcje podmieniajaca, trzeba ja wywolac
            textTemplate = g.substituteValue(textTemplate)
          } else if (utils.stringPropertyExists(g.placeholder)) {
            // jesli jest podany placeholder, to podmiana wartosci wg wzorca
            textTemplate = utils.replaceAll(textTemplate, g.placeholder, g.$refs.commonTemplate.currentValue())
          }
        })
      }
      this.templateTextResult = textTemplate
    },
    saveChangedTemplate () {
      this.updateTemplateConfiguration({
        templateName: 'default',
        templateText: this.templateText
      })
    },
    copyTemplateTextResult () {
      this.clipboardCopy(this.templateTextResult)
    },
    clipboardCopy (text) {
      clipboard.copyToClipboard(text)
      this.reportCopied()
    },
    reportCopied () {
      this.snackbar = true
    }
  }
}
</script>
