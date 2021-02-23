<template>
  <div id="app">
    <img class="logo" alt="Codein logo" src="./assets/logo.svg" />
    <h1 class="title">Codein To-do list</h1>
    <div class="content">
      <!-- <List/>
      <Preview/> -->
      <div class="board__container">
        <!-- HEADER -->
        <div class="container__header">
          <h1 class="header__title" > <span  @click="resetSelectedTask"> AVESOME BOARD </span> 
          <span v-if="selectedTask !== 'NONE'" class="header__title" @click="goToParentTask">-  Go to parent task </span>
</h1>
        <div class="header__info">
          <p class="task__total">Tasks: {{taskCount}}</p>
        </div>
        </div>
        <!-- // HEADER -->
        <!-- CONTAINER BODY -->
        <div class="container__body">
          <!-- TASK COLUMN -->
            <TaskColumn v-for="col in cols" v-bind:key="col" :column-status="col" :parent-task="selectedTask" :tasks="visibleTasks[col]"/>
          <!-- // TASK COLUMN -->
        </div>
        <!-- // BODY -->
      </div>
    </div>
    <CreateNewTask v-if="this.$store.state.createNewTask.isAddingTask === true" :status="this.$store.state.createNewTask.status" />
    <ItemInfo v-if="this.$store.state.isTaskInfoVisible === true" />
  </div>
</template>
<script>
// let List = require("./components/List.vue").default;

import TaskColumn from "./components/TaskColumn";
import CreateNewTask from './components/CreateNewTask'
import ItemInfo  from './components/ItemInfo'

import {bfs, groupBy, toList} from './utils'
export default {
  name: "App",
  components: {
    TaskColumn,
    CreateNewTask,
    ItemInfo
  },

  data() {
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
      } ,
      visibleTasks(){
        const selectedTask = this.$store.state.selectedTask
        const allTasks = this.$store.state.items
        const items = selectedTask === "NONE"
        ? allTasks
        : toList(bfs(allTasks, task => task.id === selectedTask, task => task.subtasks))
                .flatMap(it => it.subtasks);
        return groupBy(items, it => it.status)
      },
      taskCount() {
        function count(task){
          return task.subtasks.reduce((acc, it) => acc + count(it), 1)
        }
        // -1 to discard the `fake` supertask 
        return count({subtasks: this.$store.state.items}) - 1
      }
  },

  methods: {
    
    resetSelectedTask() {
      this.$store.commit('resetSelectedTask')
    },
    goToParentTask() {
      const selectedTask = this.$store.state.selectedTask
      const parent = bfs(this.$store.state.items, elem => elem.subtasks.some(it => it.id === selectedTask), elem => elem.subtasks)
      const parentId = parent && parent.id || "NONE"
      this.$store.state.selectedTask = parentId;
    }
  },

};
</script>
<style>
@import "./styles/reset-css.css";
@import './styles/varibles.css';
#app {
  height: 100vh;
  background: rgb(34,195,185);
  background: linear-gradient(33deg, rgba(34,195,185,0.5) 0%, rgba(253,187,45,0.5) 100%); 
  font-family: var(--primary-font);
}
.logo{
  margin: 0 auto;
  padding-top: 20px;
  display: block;
}
.title{
  text-align: center;
  padding-top: 10px;
  font-weight: 600;
  color: white;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
}

.board__container{
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 80%;
  border-radius: 10px;
}

.container__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.container__header .header__title {
  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
}
.container__header  .task__total{
  margin-right: 20px;
}

.container__body{
  display: flex;
}

@media only screen and (max-width: 1200px) {
.container__body{
  flex-direction: column;
  overflow-y: scroll;

  
  }
}
</style>
