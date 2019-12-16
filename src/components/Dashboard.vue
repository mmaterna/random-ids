<template>
  <v-container>
    <v-row text-center wrap>
      <v-col>
        <h2>Generator danych testowych</h2>
      </v-col>
      <v-col style="text-align: end;">
        <v-btn x-large @click="refreshAll" color="primary">
          <v-icon dark title="Odśwież wszystkie">mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Szablon</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-textarea v-model="templateText" rows="8">
                  </v-textarea>
                </v-col>

                <v-col cols="12" lg="6">
                  <v-textarea :value="templateTextResult" rows="8" @click="copyTemplateTextResult" readonly="readonly">
                  </v-textarea>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="6"
        v-for="generator in generators"
        v-bind:key="generator.name"
      >
        <component v-bind:is="generator.type" ref="generator"/>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" top :timeout="snackbarTimeout">
      Skopiowano do schowka...
    </v-snackbar>    
  </v-container>
</template>

<script>
import GeneratorPesel from "./generators/GeneratorPesel.vue"
import GeneratorNip from "./generators/GeneratorNip.vue"
import GeneratorRegon from "./generators/GeneratorRegon.vue"
import GeneratorDO from "./generators/GeneratorDO.vue"
import utils from "@/services/utils.js"
import clipboard from '@/services/clipboard.js'
import { EventBus } from '@/services/event-bus.js';

export default {
  name: "Dashboard",
  mounted () {
    EventBus.$on('clicked', someData => this.clipboardCopy(someData))
    EventBus.$on('generated', () => this.calculateTemplateResult())
    
    //pierwsze przegenerowanie szablonu
    this.calculateTemplateResult()
  },

  data: () => ({
    generators: [
      {
        name: "PESEL generator",
        type: GeneratorPesel
      },
      {
        name: "DO generator",
        type: GeneratorDO
      },
      {
        name: "NIP generator",
        type: GeneratorNip
      },
      {
        name: "Regon generator",
        type: GeneratorRegon
      },
    ],
    snackbar: false,
    snackbarTimeout: 600,

    templateText: utils.defaultTemplate(),
    templateTextResult: "",
  }),

  methods: {
    refreshAll() {
      // call generate from template generator in every generator component
      this.$refs.generator.forEach(g => g.$refs.commonTemplate.generate());
      this.calculateTemplateResult();
    },
    calculateTemplateResult() {
      // podmien wartosci
      var textTemplate = this.templateText;
      this.$refs.generator.forEach(g => {
        if (utils.funcExists(g.substituteValue)) {
          textTemplate = g.substituteValue(textTemplate);
        }
      });
      this.templateTextResult = textTemplate;
    },
    copyTemplateTextResult() {
      this.clipboardCopy(this.templateTextResult);
    },

    clipboardCopy(text) {
      clipboard.copyToClipboard(text)
      this.reportCopied()
    },
    reportCopied() {
      this.snackbar = true
    },    
  }
};
</script>
