<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{dialogTitle}}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" xs="12">
            <v-text-field label="Название графика" required v-model="editLine.label"></v-text-field>
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
            <colorPicker :color="curentColor" @changeColor="(curentColor=$event)">
              <template v-slot:colorPickerActive="{on}">
                <v-col :style="{'background-color':curentColor}" v-on="on"></v-col>
              </template>
            </colorPicker>
          </v-col>
          <v-col sm="4" :style="fullStyleLine"></v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" text @click="saveChanges(false)">Сохранить</v-btn>
      <v-btn color="primary" text @click="closeDialog(false)">Закрыть</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import colorPicker from "../ui/ColorPicker";

export default {
  components: {
    colorPicker
  },
  mounted() {
    if (this.line != null) this.editLine = { ...this.line };
    console.log("this.editLine", this.editLine);
  },
  data() {
    return {
      activeChartComponent: "borderColor",
      chartComponents: [
        { name: "Цвет линии", value: "borderColor" },
        { name: "Цвет фона", value: "backgroundColor" }
      ],
      editLine: {}
    };
  },
  props: {
    dialogTitle: {
      type: String,
      default: "Безымянный диалог :("
    },
    line: {
      default: null,
      type: Object
    }
  },
  computed: {
    curentColor: {
      get() {
        if (this.editLine[this.activeChartComponent]) {
          return this.editLine[this.activeChartComponent];
        } else {
          return "#1565c057";
        }
      },
      set(v) {
        this.editLine[this.activeChartComponent] = v;
      }
    },
    fullStyleLine() {
      return {
        "background-color": this.editLine.backgroundColor,
        border: `${this.editLine.borderWidth}px solid ${this.editLine.borderColor}`
      };
    }
  },
  methods: {
    saveChanges(){
        for(let key in this.line){
            this.line[key] = this.editLine[key]
        }
        this.$emit("saveLine ", flag);
    },
    closeDialog(flag) {
      this.$emit("closeChartLineDialog", flag);
    }
  }
};
</script>