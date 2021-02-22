<template>
          <!-- TASK COLUMN -->
          <div class="list">
            <div class="list__head">
              <h3 class="head__title">{{listName}}
                <span class="head__taskAbount">6</span>
              </h3>
              <button class="head__addTask" @click="openAddTaskPanel()">+</button>
            </div>
       

            <draggable class="list__body" v-model="colItems" @drop.prevent="drop" :start="checkMove" :end="addToNewArr">
              <!-- ELEMENT -->
                    <MainTask v-for="item in colItems" v-bind:id="item.id" v-bind:key="item.id" />
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
  props: ["listName", 'listType'],
  components: {
    CreateNewTask,
    MainTask,
    draggable
  },
  data() {
    return { 
     colItems: Object.entries(this.$store.state.items)
     .flatMap(([name, value]) => {
       return name === this.listType ? [value]: []
     })[0].items
    }
  },
  methods: {
    checkMove(evt){
      console.log(this.listType);
      console.log(evt.draggedContext.element.col);
    },
    addToNewArr() {
            console.log(evt.draggedContext.element.col);
    },
    drop(e) {
        const card_id = e.dataTransfer.getData("card_id", target.id);
    },
    // dispatch
    openAddTaskPanel(){
      this.$store.state.addTask.isAddingTask = true;
      this.$store.state.addTask.col = this.listType
    },
 
  },
  mounted() {
    setTimeout(() => {
      this.items = this.$store.state.items;
    }, 500)
    console.log(this.colItems);
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
