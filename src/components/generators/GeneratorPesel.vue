<template>
  <div>
    <GeneratorTemplate ref="commonTemplate" :generate-next-value="nextValue">
      <template v-slot:generatorName>
        <p class="headline">
          PESEL
        </p>
      </template>
      <template v-slot:settingsButton>
        <v-btn @click.stop="openSettingsDialog">
          Ustawienia
        </v-btn>
      </template>
      <template v-slot:currentSettings>
        {{ settingsSex }} {{ settingsAge }} {{ settingsBirthday }}
      </template>
    </GeneratorTemplate>

    <!-- settings dialog -->
    <v-dialog
      v-model="dialog"
      max-width="450"
    >
      <v-card>
        <v-card-title class="headline">
          Ustawienia generatora PESEL
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-radio-group v-model="editSettings.sex">
                  <template v-slot:label>
                    <div>Płeć</div>
                  </template>
                  <v-radio value="male">
                    <template v-slot:label>
                      <div class="blue--text">
                        Mężczyzna
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="female">
                    <template v-slot:label>
                      <div class="pink--text text--lighten-2">
                        Kobieta
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="all">
                    <template v-slot:label>
                      <div class="grey--text">
                        Wszyscy
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="4" lg="4">
                <v-text-field v-model="editSettings.age" label="Wiek" :rules="[ageRules]" required />
              </v-col>

              <v-col cols="8" lg="6">
                <v-menu
                  ref="birthdayDatePickerVisible"
                  v-model="birthdayDatePickerVisible"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="editSettings.birthDate"
                      label="Data urodzenia"
                      hint="YYYY-MM-DD"
                      persistent-hint
                      :rules=" [birthDateRules] "
                      v-on="on"
                    />
                  </template>
                  <v-date-picker v-model="editSettings.birthDate" no-title @input="birthdayDatePickerVisible = false" />
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text :disabled="!valid" @click="saveOptions">
            Ustaw
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import GeneratorTemplate from '@/components/generators/GeneratorTemplate.vue'
import peselService from '@/services/generators/pesel.js'
import { mapActions } from 'vuex'
import utils from '@/services/utils.js'

export default {
  name: 'PESEL',
  placeholder: 'pesel',

  components: {
    GeneratorTemplate
  },

  data: () => ({
    dialog: false,
    valid: true,
    date: null,
    birthdayDatePickerVisible: false,
    currentSettings: {
      age: 40,
      birthDate: null,
      sex: 'male'
    },
    editSettings: {
      age: null,
      birthDate: null,
      sex: 'all'
    }
  }),

  computed: {
    settingsAge () {
      if (this.currentSettings.birthDate) return ''
      return this.currentSettings.age ? 'Wiek: ' + this.currentSettings.age : ''
    },
    settingsBirthday () {
      return this.currentSettings.birthDate ? 'Ur.: ' + this.currentSettings.birthDate : ''
    },
    settingsSex () {
      if (this.currentSettings.sex === 'male') {
        return 'M'
      } else if (this.currentSettings.sex === 'female') {
        return 'K'
      }
      return ''
    }
  },

  created () {
    const loadedConfig = this.$store.getters.getGeneratorSettings(this.$options.name)
    if (loadedConfig) {
      this.currentSettings = loadedConfig
    }
  },

  methods: {
    ...mapActions(['updateGeneratorConfiguration']),
    nextValue () {
      const nextPesel = peselService.pesel(
        this.currentSettings.birthDate,
        this.currentSettings.age,
        this.currentSettings.sex
      )
      return nextPesel
    },
    openSettingsDialog () {
      this.editSettings.birthDate = this.currentSettings.birthDate
      this.editSettings.age = this.currentSettings.age
      this.editSettings.sex = this.currentSettings.sex
      this.dialog = true
    },
    saveOptions () {
      this.currentSettings.birthDate = this.editSettings.birthDate
      this.currentSettings.age = this.editSettings.age
      this.currentSettings.sex = this.editSettings.sex
      this.dialog = false

      this.updateGeneratorConfiguration({ name: this.$options.name, config: this.currentSettings })
    },
    birthDateRules (a) {
      return !a || ((/^\d\d\d\d-\d\d-\d\d$/.test(a)) && !!utils.isDateValid(a)) || 'Data powinna byc w formacie yyyy-mm-dd z przedziału 1000-01-01 do 2999-12-31'
    },
    ageRules (a) {
      return !a || (a >= 1 && a <= 99) || 'Wiek powinien być z przedziału między 1 a 99'
    }
  }

}
</script>

<style>
</style>
