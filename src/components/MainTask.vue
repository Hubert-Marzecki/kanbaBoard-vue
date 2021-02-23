<template>
  <!-- TASK COLUMN -->
  <!-- ELEMENT -->
  <div class="list__element" draggable="true">
    <h3 class="element__name" v-on:dblclick="changeName">{{ name }}</h3>
    <div class="element__info">
      <div class="info__subtasks">
        <img class="subtask__icon" src="../assets/clipboard.png" />
        <span class="subtask__amount" @click="setParentTask">
          Subtasks: {{ subtasks.length }}
        </span>
      </div>
      <div
        v-if="important === 'Medium'"
        class="info__priority info__priority--medium"
      >
        {{ important }}
      </div>
      <div
        v-if="important === 'Height'"
        class="info__priority info__priority--height"
      >
        {{ important }}
      </div>
      <div
        v-if="important === 'Low'"
        class="info__priority info__priority--low"
      >
        {{ important }}
      </div>
    </div>
  </div>
  <!-- // ELEMENT -->
  <!-- // TASK COLUMN -->
</template>
<script>
// let List = require("./components/List.vue").default;
// <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
export default {
  name: "MainTask",
  props: ["id", "name", "subtasks", "important"],

  data() {
    return {
      isChangingName: true,
    };
  },

  methods: {
    changeName() {
    },

    dragStart(e) {
      const target = e.target;
      e.dataTransfer = setData("card_id");
    },
    displayTaskInfo(e) {
    },
    setParentTask(e) {
      this.$store.state.selectedTask = this.id;
      console.log(this.$store.state.selectedTask);
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
@import "../styles/reset-css.css";
@import "../styles/varibles.css";
@keyframes mymove {
  from {opacity: 0;}
  to {opacity:  1;}
}

.list__element {
  border: 1px solid white;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  animation: mymove 0.6s;
}
.element__name {
  margin-left: 10px;
  margin-top: 10px;
  font-weight: 500x;
}
.element__info {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 12px;
}
.subtask__icon {
  margin-left: 10px;
  height: 15px;
}

.info__priority {
  margin-right: 10px;
  padding: 5px 10px;
  margin-top: -3px;
  border-radius: 10px;
}
.info__priority--medium {
  background-color: rgb(255, 253, 206);
}
.info__priority--height {
  background-color: rgb(255, 173, 153);
}
.info__priority--low {
  background-color: rgb(224, 255, 229);
}
.element__info {
  display: flex;
  justify-content: space-between;
}
</style>
