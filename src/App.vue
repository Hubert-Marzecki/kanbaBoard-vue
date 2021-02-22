<template>
  <div id="app">
    <img alt="Codein logo" src="./assets/logo.svg" />
    <h1>Codein To-do list</h1>
    <div class="content">
      <!-- <List/>
      <Preview/> -->
      <div class="board__container">
        <!-- HEADER -->
        <div class="container__header">
          {{this.$store.state.selectedTask}}
          <h1 class="header__title" @click="resetSelectedTask" > All tasks
            <span v-if="selectedTask !== 'NONE'" class="header__title" @click="goToParentTask"> -  Go to parent task </span>
            </h1>
        <div class="header__info">
          <p class="task__total">Tasks: 21</p>
          <select>
            <option>All Task</option>
            <option>Completed</option>
            <option>With Subtask</option>
          </select>
        </div>
        </div>
        <!-- // HEADER -->
        <!-- CONTAINER BODY -->
        <div class="container__body">
          <!-- TASK COLUMN -->
            <TaskColumn v-for="col in cols" v-bind:key="col" :column-status="col" :parent-task="selectedTask" />
          <!-- // TASK COLUMN -->
        </div>
        <!-- // BODY -->
      </div>
    </div>
    <CreateNewTask v-if="this.$store.state.createNewTask.isAddingTask === true" :status="this.$store.state.createNewTask.status" />
  </div>
</template>
<script>
// let List = require("./components/List.vue").default;

import List from "./components/List";
import TaskColumn from "./components/TaskColumn";
import CreateNewTask from './components/CreateNewTask'
export default {
  name: "App",
  components: {
    TaskColumn,
    List,
    CreateNewTask,
  },

  data() {
 // TODO export constants to a separate file 
    return{
      col: Object.entries(this.$store.state.column),
      cols : [
      "Tasks",
      "Pending Issue",
      "In Progress",
      "Under Review",
      "Done",
    ],
    }

  },

  computed: {
      selectedTask() {
        return this.$store.state.selectedTask
      } 
  },

  methods: {
    resetSelectedTask() {
      this.$store.state.selectedTask = "NONE"
    },

    find(id, tasks, parent){
        if(tasks.length === 0 ){
          return undefined;
        } else if (tasks.some(task => task.id === id)) {
          return parent
        } else {
          return tasks.find(task => find(id, task.subtasks, task.id))
        }
      },
    goToParentTask() {
      // function findParent( id, items, parent){
      //   if(items.length ===0 ){
      //     return undefined
      //   }
      //   const found = items.find(it => it.id === id) && parent
      //   return found || items.find()
      // }
      const parent = find(this.$store.state.selectedTask, this.$store.state.items, "NONE")
      
      this.$store.state.selectedTask = parent;
    }
  },
  mounted() {
    console.log(this.col)
  }
};
</script>
<style>
@import "./styles/reset-css.css";
@import './styles/varibles.css';
#app {
  height: 100vh;
  background-color: burlywood;
}
.content {

  background-color: cadetblue;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
}

.board__container{
    background-color: rgb(183, 249, 252);
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 80%;
}

.container__header{
  display: flex;
  background-color: chartreuse;
  justify-content: space-between;
}
.header__info{
  display: flex;
}

.container__body{
  display: flex;
  direction: row;
  background-color: yellow;
  overflow-x: visible;
}

.list{
  display: flex;
  flex-direction: column;
  width: 20%;
  background-color: cornflowerblue;
}

.list__head{
  display: flex;
  justify-content: space-between;
}

.list__element{
  
}

.element__info{
  display: flex;
  justify-content: space-between;
}
</style>
