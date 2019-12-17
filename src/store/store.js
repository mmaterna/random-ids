import Vue from "vue";
import Vuex from "vuex";

import defaultConfiguration from "./default-config.js";
import storageService from "./storage-service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    configuration: {}
  },

  getters: {
    getAllTemplates(state) {
      return state.configuration.templates;
    },

    getGeneratorSettings: state => name => {
      return state.configuration.generators[name];
    }
  },

  actions: {
    //methods, external calls, update state using mutations
    loadConfiguration(context) {
      const loadedConfig = storageService.loadConfig();
      if (loadedConfig) {
        context.commit("setConfig", loadedConfig);
      } else {
        const loadedConfig = defaultConfiguration.get();
        storageService.saveConfig(loadedConfig);
        context.commit("setConfig", loadedConfig);
      }
    },

    updateGeneratorConfiguration(context, dataObject) {
      context.commit("setGeneratorConfiguration", dataObject);
      storageService.saveConfig(context.state.configuration);
    },

    updateTemplateConfiguration(context, dataObject) {
        context.commit("setTemplateConfiguration", dataObject);
        storageService.saveConfig(context.state.configuration);
      }
  
  },

  mutations: {
    setGeneratorConfiguration(state, dataObject) {
      state.configuration.generators[dataObject.name] = dataObject.config;
    },
    setTemplateConfiguration(state, dataObject) {
      state.configuration.templates[dataObject.templateName] = dataObject.templateText;
    },

    setConfig(state, config) {
      state.configuration = config;
    }
  }
});
