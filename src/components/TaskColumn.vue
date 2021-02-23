<template>
  <!-- TASK COLUMN -->
  <div class="list">
    <div class="list__head">
      <h3 class="head__title">{{ columnStatus }}</h3>
      <button class="head__addTask" @click="openAddTaskPanel()">+</button>
    </div>
    <draggable
      class="list__body"
      v-model="colItems"
    >
      <!-- ELEMENT -->
      <MainTask
        v-for="item in colItemsFn"
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
  props: ["columnStatus", "parentTask"],
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
    };
  },

  computed: {
    colItemsFn() {
      function colItemsFromParent(allItems, parentTask) {
        function findById(items, id) {
          if (items.length === 0) {
            return undefined;
          }
          const item = items.find((it) => it.id === id);
          return (
            item ||
            findById(
              items.flatMap((it) => it.subtasks),
              id
            )
          );
        }
        const task = findById(allItems, parentTask);
        return task && task.subtasks;
      }
      const items =
        this.$store.state.selectedTask === "NONE"
          ? this.$store.state.items
          : colItemsFromParent(
              this.$store.state.items,
              this.$store.state.selectedTask
            );
      return items.filter((item) => item.status === this.columnStatus);
    },
  },
  methods: {
    checkMove(evt) {},
    addToNewArr() {},
    drop(e) {
      const card_id = e.dataTransfer.getData("card_id", target.id);
    },
    // dispatch
    openAddTaskPanel() {
      this.$store.state.createNewTask.status = this.columnStatus;
      this.$store.state.createNewTask.isAddingTask = true;
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
