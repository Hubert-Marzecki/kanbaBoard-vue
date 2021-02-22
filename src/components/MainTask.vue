<template>
  <!-- TASK COLUMN -->
  <!-- ELEMENT -->
  <div class="list__element"  @click="e => displayTaskInfo(e)"   draggable='true'   >
    <h3 class="element__header">Create a profile screen</h3>
    <div class="element__info">
      <div class="info__subtasks">
        <img class="subtask__icon" src="#" />
        <span class="subtask__amount">Subtasks: {{id}}  </span>
      </div>
      <div class="info__priority">
        <span class="DYNAMIC CONENT">Medium</span>
      </div>
    </div>
  </div>
  <!-- // ELEMENT -->
  <!-- // TASK COLUMN -->
</template>
<script>
// let List = require("./components/List.vue").default;

export default {
  name: "MainTask",
  props: ["id"],

methods: {
  dragStart(e) {
      const target = e.target;
      e.dataTransfer =setData("card_id")
  },
  displayTaskInfo(e) {
      console.log(e.target);
  }
},
  mounted() {
    console.log(this.id);
  }
};



</script>
<style>
@import "../styles/reset-css.css";
@import '../styles/varibles.css';


.list__element{
 border: 1px solid white;
}

.element__info{
  display: flex;
  justify-content: space-between;
}
</style>
