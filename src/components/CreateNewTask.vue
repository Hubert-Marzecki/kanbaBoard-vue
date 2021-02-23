<template>
  <div class="container">
  <form class="input__holder" @submit.prevent="addTask" >
    
    <label>Name</label>
    <input type="text" 

    class="input" v-model="newItem.name" required/>
    <br>
    <label>Description</label>

    <textarea  
    type="text"  class="input desc" v-model="newItem.details" />
    <br>

    <select v-model="newItem.important" class="select" required>
      <option>Low</option>
      <option>Medium</option>
      <option>Height</option>
    </select>
    <button class="add__task" type="sumbit" >ADD TASK</button>
  </form>
  </div>
</template>
<script>
// let List = require("./components/List.vue").default;
import { v4 as uuidv4 } from "uuid";
import {bfs, toList} from "../utils";
export default {
  name: "CreateNewTask",
  props: ["status"],
   
  data() {
    return {
      newItem: {
        name: "",
        details: "",
        important: "",
        id: uuidv4(),
        status: this.status,
      },
    };
  },
  methods: {
    addTask() {
      const newTask = {
        name: this.newItem.name,
        details: this.newItem.details,
        important: this.newItem.important,
        id: uuidv4(),
        status: this.status,
        subtasks:[]
      }
     this.$store.commit("addTask", newTask)
    },
  },
};
</script>
<style scoped>
@import "../styles/reset-css.css";
@import "../styles/varibles.css";

@keyframes mymove {
  from {opacity: 0;}
  to {opacity:  1;}
}

.container {
  background-color: #9b9b9b70;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  top: 0;
  left:0;
  position: absolute;
  animation: mymove 0.2s;
}

.input__holder{
  background-color: #9b9b9b70;
  position: absolute;
  width: 50%;
  height: 50%;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
label{
    font-family: var(--primary-font);
    font-weight: 700;
}
.input{
  border: none;
  width: 50%;
  margin: 10px auto 20px;
  padding: 10px;
  font-family: var(--primary-font);
}
.desc{
    width: 50%;
    padding: 10px;
    font-family: var(--primary-font);
    font-size: 14px;
}
.select{
  width: 100px;
  border-radius: 10px;
  border: none;
  padding: 5px 10px;
  font-family: var(--primary-font);

} 

.add__task{

  outline: none;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  margin-top: 20px;
  background-color: white;
  cursor: pointer;
}
</style>
