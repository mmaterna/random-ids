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
      <v-col cols="12" lg="6"
        v-for="generator in generators"
        v-bind:key="generator.name"
      >
        <component v-bind:is="generator.type" ref="generator"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GeneratorPesel from "./generators/GeneratorPesel.vue"
import GeneratorNip from "./generators/GeneratorNip.vue"
import GeneratorRegon from "./generators/GeneratorRegon.vue"
import GeneratorDO from "./generators/GeneratorDO.vue"

export default {
  name: "Dashboard",
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
    ]
  }),
  methods: {
    refreshAll() {
      // call generate from template generator in every generator component
      this.$refs.generator.forEach(g => g.$refs.commonTemplate.generate());
    }
  }
};
</script>
