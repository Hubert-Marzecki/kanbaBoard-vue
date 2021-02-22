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
          <h1 class="header__title">Design Team Board</h1>
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
            <TaskColumn v-for="col in col" v-bind:key="col[0].displayName" :list-name="col[1].displayName" :list-type="col[0]"  />
          <!-- // TASK COLUMN -->
        </div>
        <!-- // BODY -->
      </div>
    </div>
    <CreateNewTask v-if="this.$store.state.addTask.isAddingTask === true" :status="this.$store.state.addTask.status" />
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
    return{
      col: Object.entries(this.$store.state.column)
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
