<template>
  <!-- TASK COLUMN -->
  <div class="list">
    <div class="list__head">
      <h3 class="head__title">{{ columnStatus }}</h3>
      <button class="head__addTask" @click="openAddTaskPanel()">+</button>
    </div>
    <draggable
      class="list__body"
      v-model="localTasks"
       @start="drag=true" 
    >
      <!-- ELEMENT -->
      <MainTask
        v-for="item in localTasks"
        v-bind:id="item.id"
        v-bind:key="item.id"
        v-bind:name="item.name"
        v-bind:subtasks="item.subtasks"
        v-bind:important="item.important"
      />
      <!-- // ELEMENT -->
    </draggable>
  </div>
  <!-- // TASK COLUMN -->
</template>

<script>
import draggable from "vuedraggable";
// let List = require("./components/List.vue").default;
import { v4 as uuidv4 } from "uuid";
import ListElement from "./ListElement";
import MainTask from "./MainTask";
import CreateNewTask from "./CreateNewTask";

export default {
  name: "TaskColumn",
  props: ["columnStatus", "parentTask", "tasks"],
  components: {
    CreateNewTask,
    MainTask,
    draggable,
  },
  data() {
    return {
      colItems: this.$store.state.items.filter((item) => {
        return item.status === this.columnStatus;
      }),
      localTasks: this.tasks
    };
  },
  computed: {
    // localoTasks(){
    //   return this.tasks
    // } 
  },
  methods: {
    checkMove(evt) {},
    addToNewArr() {},
    drop(e) {
      console.error(e);
      const card_id = e.dataTransfer.getData("card_id", target.id);
    },
    // dispatch
    openAddTaskPanel() {
      this.$store.commit("openAddTaskPanel", this.columnStatus)
    },
  },
  mounted() {
    setTimeout(() => {
      this.items = this.$store.state.items;
    }, 500); 
  },
};
</script>
<style>
@import "../styles/reset-css.css";
@import "../styles/varibles.css";

.list {
  display: flex;
  flex-direction: column;
  width: 20%;
  margin-left: 10px;
  background-color: rgba(226, 228, 255, 0.548);
  border-radius: 10px;
}
.list:last-child {
  margin-right: 20px;
}

.list__head {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  font-weight: 600;
}

.head__addTask {
  border: none;
  outline: none;
  background: none;
  margin-right: 20px;
  font-size: 20px;
  line-height: 0px;
  padding-bottom: 2px;
  cursor: pointer;
}

.list__element {
}

.element__info {
  display: flex;
  justify-content: space-between;
}

@media only screen and (max-width: 1200px) {
  .list {
    width: 94%;
    margin-top: 10px;
  }
}
</style>
