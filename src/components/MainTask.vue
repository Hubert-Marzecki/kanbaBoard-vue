<template>
  <div class="list__element" draggable="true">
    <h3 v-if="isChangingName === false" class="element__name" v-on:dblclick="changeName"  >{{ name }}</h3>
    <input v-if="isChangingName === true" v-on:blur="updateName" v-on:keyup.enter="updateName" v-model="localName" class="element__name input"  />

    <div class="element__info">
      <div class="info__subtasks">
        <img class="subtask__icon" src="../assets/clipboard.png" />
        <span class="subtask__amount" @click="displayTaskSubtasks">
      
          Subtasks: {{ subtasks.length }} 
        </span>
        <span class="view__notes" @click="displayTaskInfo"> Edit </span>
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
</template>
<script>
export default {
  name: "MainTask",
  props: ["id", "name", "status", "subtasks", "important"],

  data() {
    return {
      isChangingName: false,
      localName: this.name
    };
  },

  methods: {
    updateName() {
      this.$store.commit("updateTaskName",{id: this.id, name: this.localName})
      this.isChangingName =  false
    },
    changeName() {
        this.isChangingName = true;
    },
    displayTaskInfo() {
      this.$store.commit("displayTaskInfo", this.id);
    },
    displayTaskSubtasks() {
      this.$store.commit("displayTaskSubtasks", this.id);
    },
     add: function() {
     console.log("added");
    },
    replace: function() {
   console.log("removed");
    }
  },

};
</script>
<style scoped>
@import "../styles/reset-css.css";
@import "../styles/varibles.css";
.list__element {
  border: 1px solid white;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
 
}
.element__name {
  margin-left: 10px;
  margin-top: 10px;
  font-weight: 500;
  font-size: 14px;
  word-wrap: break-word;
  padding-right: 10px;
}
.element__info {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
}
.subtask__icon {
  margin-left: 10px;
  height: 15px;
}

.info__priority {
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  margin-top: 10px; 
  width: 50%;
}
.input{
  width: 80%;
}
.view__notes{
  padding: 5px 8px;
  background-color: rgba(211, 211, 211, 0.562);
  border-radius: 5px;
  margin-left: 10px;
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
