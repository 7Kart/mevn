<template>
  <v-card>
    <v-form ref="form" v-model="formValid">
      <v-card-title>
        <span class="headline">{{dialogTitle}}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" xs="12">
              <v-text-field label="Название графика" required v-model="line.label"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center">
            <!-- color picker -->
            <v-col cols="12" sm="6">
              <v-select
                :items="chartComponents"
                item-text="name"
                item-value="value"
                label="Компонент графика"
                v-model="activeChartComponent"
                required
              ></v-select>
            </v-col>
            <v-col sm="2">
              <colorPicker :color="curentColor" @changeColor="(onColorChange($event))">
                <template v-slot:colorPickerActive="{on}">
                  <v-col :style="{'background-color':curentColor}" v-on="on"></v-col>
                </template>
              </colorPicker>
            </v-col>
            <v-col sm="4" :style="fullStyleLine"></v-col>
          </v-row>
          <v-row>
            <!-- developer's project -->
            <v-col>
              <v-autocomplete
                v-model="line.filter.projectsIds"
                :items="developersProject"
                :item-text="formatCombobxItem"
                item-value="projectId"
                label="Проекты"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-range-slider
                v-model="line.filter.flatsCountRange"
                :max="10"
                :min="1"
                :hide-details="true"
                thumb-label="always"
                :thumb-size="24"
                label="Количество комнат"
              ></v-range-slider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-switch v-model="line.filter.isDesign" :label="`Квартиры с отделкой`"></v-switch>
            </v-col>
            <v-col>
              <v-switch v-model="line.filter.isWhiteBox" label="WhiteBox"></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" text @click="saveChanges(false)">Сохранить</v-btn>
        <v-btn color="primary" text @click="closeDialog(false)">Закрыть</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import colorPicker from "../ui/ColorPicker";
import numberPicker from "../ui/NumberPicker";

export default {
  components: {
    colorPicker,
    numberPicker
  },
  data() {
    return {
      backgroundColor: this.line.backgroundColor,
      borderColor: this.line.borderColor,
      formValid: true,
      activeChartComponent: "borderColor",
      chartComponents: [
        { name: "Цвет линии", value: "borderColor" },
        { name: "Цвет фона", value: "backgroundColor" }
      ]
    };
  },
  props: {
    dialogTitle: {
      type: String,
      default: "Безымянный диалог :("
    },
    line: {
      required: true,
      type: Object
    }
  },
  computed: {
    curentColor() {
      return this[this.activeChartComponent];
    },
    developersProject() {
      return this.$store.getters.getAllProjects;
    },
    fullStyleLine() {
      return {
        "background-color": this.line.backgroundColor,
        border: `${this.line.borderWidth}px solid ${this.line.borderColor}`
      };
    }
  },
  methods: {
    saveChanges() {
      this.$emit("lineEdited", this.line);
    },
    closeDialog(flag) {
      this.$emit("closeChartLineDialog", flag);
    },
    formatCombobxItem(project) {
      return `${project.projectName} (${project.developerName})`;
    },
    onColorChange(color) {
      this.line[this.activeChartComponent] = color;
      this[this.activeChartComponent] = this.line[this.activeChartComponent];
    }
  }
};
</script>