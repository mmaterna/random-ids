<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          title="Generator danych testowych"
          class="shrink mr-2"
          contain
          src="logo.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-toolbar-title class="ml-10 hidden-sm-and-down">
        <h1>Generator danych testowych</h1>
      </v-toolbar-title>

      <v-col style="text-align: end;">
        <v-btn large rounded outlined color="accent" title="Generuj wszystkie" @click="refreshAll">
          <v-img
            alt="Generuj wszystkie"
            class="shrink mr-2"
            src="logo.png"
            width="30"
          />
          Generuj wszystkie
        </v-btn>
      </v-col>
      ☀️<v-switch
        v-model="$vuetify.theme.dark"
        hide-details
      />🌙
    </v-app-bar>

    <v-content>
      <Dashboard ref="dashboard" />
    </v-content>
  </v-app>
</template>

<script>
import Dashboard from './components/Dashboard'

export default {
  name: 'App',

  components: {
    Dashboard
  },

  methods: {
    refreshAll () {
      this.$refs.dashboard.refreshAll()
    }
  },
  computed: {
    theme () {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }

}
</script>
