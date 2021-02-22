<template>
          <!-- TASK COLUMN -->
          <div class="list">
            <div class="list__head">
              <h3 class="head__title">{{columnStatus}}
                <span class="head__taskAbount">6</span>
              </h3>
              <button class="head__addTask" @click="openAddTaskPanel()">+</button>
            </div>
            <draggable class="list__body" v-model="colItems" @drop.prevent="drop" :start="checkMove" :end="addToNewArr">
              <!-- ELEMENT -->
                    <MainTask v-for="item in colItemsFn" v-bind:id="item.id" v-bind:key="item.id" v-bind:name="item.name" />
              <!-- // ELEMENT -->
            </draggable>
          </div>
          <!-- // TASK COLUMN -->
</template>

<script>
import draggable from "vuedraggable";
// let List = require("./components/List.vue").default;
import { v4 as uuidv4 } from "uuid";
import ListElement from './ListElement';
import MainTask from "./MainTask";
import CreateNewTask from "./CreateNewTask";

export default {
  name: "TaskColumn",
  props: ["columnStatus", "parentTask"],
  components: {
    CreateNewTask,
    MainTask,
    draggable
  },
  data() {
    return { 
     colItems:  this.$store.state.items.filter(item => {
       return item.status === this.columnStatus
     })
    }
  },
  
  computed: {
    colItemsFn (){     
      function colItemsFromParent(allItems, parentTask) {
        function findById(items, id) {
        if(items.length === 0) {
          return undefined 
        }
        console.log(items);
        const item = items.find(it => it.id === id)
        return item || findById(items.flatMap(it => it.subtasks), id);
      } 
      const task = findById(allItems, parentTask)
      return task && task.subtasks
    } 
      const items = this.$store.state.selectedTask === "NONE" ? this.$store.state.items : colItemsFromParent(this.$store.state.items, this.$store.state.selectedTask);
      console.log(items)
      console.log(this.columnStatus)
      return items.filter(item => item.status === this.columnStatus );
    },
  },
  methods: {
     checkMove(evt){
    },
    addToNewArr() {
    },
    drop(e) {
        const card_id = e.dataTransfer.getData("card_id", target.id);
    },
    // dispatch
    openAddTaskPanel(){
      this.$store.state.createNewTask.status = this.columnStatus
      this.$store.state.createNewTask.isAddingTask = true;
    },
 
  },
  mounted() {
    setTimeout(() => {
      this.items = this.$store.state.items;
    }, 500)
    console.log(this.columnStatus);
  },
}

</script>
<style>
@import "../styles/reset-css.css";
@import '../styles/varibles.css';

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
