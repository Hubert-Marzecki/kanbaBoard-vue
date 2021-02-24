<template>
  <div class="container">
     <form class="input__holder" @submit.prevent="updateItem" >
    <label>Name</label>
    <input type="text" 
    class="input" v-model="updatedTask.name" />
    <br>
    <label>Description</label>

    <textarea  
    type="text" class="input desc" v-model="updatedTask.details"/>
    <br>

    <select v-model="updatedTask.important" class="select" >
      <option>Low</option>
      <option>Medium</option>
      <option>Height</option>
    </select>
    <div class="button__wrapper">
    <button class="button add__task" type="sumbit" >Update Task</button>
    <button class="button canel__update" @click.prevent="closeDisplay" >Cancel</button>
    <button class="button delete__task" @click.prevent="deleteTask" >Delete</button>

    </div>

  </form>
  </div>
</template>
<script>
// let List = require("./components/List.vue").default;
import { v4 as uuidv4 } from "uuid";
import {bfs} from "../utils";
export default {
  name: "ItemInfo",
  data() {
      return {
        updatedTask: {
          id: "NONE",
          name: "",
          details: "",
          important: ""
        }
      }
  },
  methods: {
        closeDisplay() {
            this.$store.commit("closeItemInfo")
        },
        deleteTask() {
          this.$store.commit("deleteTask", this.updatedTask.id)
        },
        updateItem() {
          console.error(this.updatedTask)
          if(this.updatedTask.name !== "") {
            const newModel = {
                id: this.updatedTask.id,
                name: this.updatedTask.name,
                details: this.updatedTask.details,
                important: this.updatedTask.important
              }
              console.error(newModel); 
              this.$store.commit("updateTask",newModel)
          }
        }
    },
    created() {
          const allTasks = this.$store.state.items;
          const selectedTask = this.$store.state.taskToDisplay;
          const {id, name, details, important} = bfs(allTasks, it => it.id === selectedTask, task => task.subtasks)||  {
              id: "NONE",
              name: "",
              details: "",
              important: ""
            }
          this.updatedTask.id = id;
          this.updatedTask.name = name;
          this.updatedTask.details = details;
          this.updatedTask.important = important;
        }
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
  background-color: #dadada70;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  top: 0;
  left:0;
  position: absolute;
  animation: mymove 0.2s;
}

.input__holder{
  background-color: #c2c2c246;
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
  border-radius: 5px;
}
.desc{
    width: 50%;
    padding: 10px;
    font-family: var(--primary-font);
    font-size: 14px;
}
.select{
  width: 100px;
  border: none;
  padding: 5px 10px;
  font-family: var(--primary-font);
  border-radius: 5px;
} 
.button__wrapper{
  display: flex;
  justify-content: space-around;
}
.button{
  margin: 0 10px;
  outline: none;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
  background-color: rgb(199, 253, 188);
  cursor: pointer;
}
.canel__update{
  background-color: transparent;
  border: 1px solid black
}
.delete__task{
  background-color: rgba(255, 131, 131, 0.459);
}
</style>
