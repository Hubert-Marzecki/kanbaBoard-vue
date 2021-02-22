<template>
<div class="container">
  <input type="text" placeholder="Name" v-model="name"/>
  <input type="text" placeholder="Description" v-model="details"/>
  <select v-model="importance">
    <option>Low</option>
    <option>Medium</option>
    <option>Hight</option>
  </select>
  <button @click="addTask"> ADD TASK </button>
</div>
</template>
<script>
// let List = require("./components/List.vue").default;
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CreateNewTask",
  data() {
    return {
        name: "",
        details: "",
        importance: "",
        id: uuidv4(),
        col: this.$store.state.addTask.col
    }
  },
  methods: {
    addTask() {
      console.log(this.$store.state.addTask.col);
       this.$store.state.column[this.$store.state.addTask.col].items.push({
          name: this.name,
          details: this.details,
          importance: this.importance,
          id: uuidv4(),
          col: this.$store.state.addTask.col
       })
       this.$store.state.addTask.isAddingTask = false
    }
  },
};
</script>
<style scoped>
@import "../styles/reset-css.css";
@import '../styles/varibles.css';

.container {
    position: absolute;
  padding: 200px;
  background-color: #000000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
