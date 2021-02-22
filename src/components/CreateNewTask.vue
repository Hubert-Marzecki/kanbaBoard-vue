<template>
<div class="container">
  <input type="text" placeholder="Name" v-model="newItem.name"/>
  <input type="text" placeholder="Description" v-model="newItem.details"/>
  <select v-model="newItem.importance">
    <option>Low</option>
    <option>Medium</option>
    <option>Hight</option>
  </select> 
  <button @click.prevent="addTask"> ADD TASK </button>
</div>
</template>
<script>
// let List = require("./components/List.vue").default;
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CreateNewTask",
  props: ["status"],
  data() {
    return {
      newItem: {
        name: "",
        details: "",
        importance: "",
        id: uuidv4(),
        status: this.status
      }
    }
  },
  methods: {
    addTask() {
      // console.log(this.$store.state.createNewTask.status);
      // console.log("props",this.status);
      console.log(this.status);
      const a = this.$store.state.items
      a.push({
        name: this.name,
        details: "",
        importance: "",
        id: uuidv4(),
        status: this.status
      });
      this.$store.state.items = [...a];
      console.log(this.$store.state.items);
      // this.$store.state.items.push(
      //   {
      //   name: this.name,
      //   details: "",
      //   importance: "",
      //   id: uuidv4(),
      //   status: this.status
      // }
      // );
      //  this.$store.state.column[this.$store.state.createNewTask.col].items.push({
      //     name: this.name,
      //     details: this.details,
      //     importance: this.importance,
      //     id: uuidv4(),
      //     col: this.$store.state.createNewTask.col
      //  })
       this.$store.state.createNewTask.isAddingTask = false
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
