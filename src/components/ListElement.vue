<template>
  <!-- TASK COLUMN -->

      <!-- ELEMENT -->
      <div class="list__element">
        <h3 class="element__header">Create a profile screen</h3>
        <div class="element__info">
          <div class="info__subtasks">
            <img class="subtask__icon" src="#" />
            <span class="subtask__amount">Subtasks: 12</span>
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
import { v4 as uuidv4 } from "uuid";

export default {
  name: "ListElement",
};
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
