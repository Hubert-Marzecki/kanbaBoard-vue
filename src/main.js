import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.config.productionTip = false;
import { v4 as uuidv4 } from "uuid";
import {bfs} from "./utils";
const store = new Vuex.Store({
  state: {
    items: [
      {
        id: uuidv4(),
        name: "0",
        details:
          "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
        status: "Tasks",
        important: "Medium",
        subtasks: [],
      },
      {
        id: uuidv4(),
        name: "2",
        details:
          "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
        important: "Medium",
        status: "Pending Issue",
        subtasks: [
          {
            id: uuidv4(),
            name: "01",
            details:
              "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
            important: "Medium",
            status: "In Progress",
            subtasks: [],
          },
          {
            id: uuidv4(),
            name: "21",
            details:
              "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
            important: "Medium",
            status: "Under Review",
            subtasks: [
              {
                id: uuidv4(),
                name: "Namo",
                details:
                  "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
                important: "Medium",
                status: "Under Review",
                subtasks: [],
              },
              {
                id: uuidv4(),
                name: "Namo",
                details:
                  "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
                important: "Medium",
                status: "Done",
                subtasks: [],
              },
            ],
          },
        ],
      },

      {
        id: uuidv4(),
        name: "02",
        details:
          "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
        status: "In Progress",
        important: "Medium",
        subtasks: [],
      },
      {
        id: uuidv4(),
        name: "03",
        details:
          "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
        status: "Under Review",
        important: "Low",
        subtasks: [],
      },

      {
        id: uuidv4(),
        name: "04",
        details:
          "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
        status: "Under Review",
        important: "Height",
        subtasks: [],
      },
    ],
    createNewTask: {
      isAddingTask: false,
      status: "",
    },
    column: {
      tasks: {
        displayName: "Tasks",
        items: [],
      },
      pendingIssue: {
        displayName: "Pending Issue",
        items: [],
      },
      inProgress: {
        displayName: "In Progress",
        items: [],
      },
      underReview: {
        displayName: "Under Review",
        items: [],
      },
      pushLive: {
        displayName: "Push Live",
        items: [],
      },
    },
    selectedTask: "NONE",
    taskToDisplay: "dupa?",
    isTaskInfoVisible: false
  },
  mutations: {
    addItem(state, item) {
      state.items.push(item);
    },
    selectItem(state, uuid) {
      let select = (i) => {
        i.children.map(select);
        i.selected = i.id === uuid;
        return i;
      };
      state.items = state.items.map(select);
    },
    rename(state, { uuid, name }) {
      let select = (i) => {
        i.children.map(select);
        if (i.id === uuid) {
          i.name = name;
        }
        return i;
      };
      state.items = state.items.map(select);
    },
    addTask(state, newTask){
      const allTasks = state.items;
      const selectedTask = state.selectedTask
      const parentTasks = selectedTask === "NONE"
          ? allTasks        
          : toList(bfs(allTasks, task => task.id === selectedTask, task => task.subtasks));
      parentTasks.push(newTask);
      state.items = [...allTasks];
      state.createNewTask.isAddingTask = false;
    },
    closeItemInfo(state) {
      state.isTaskInfoVisible = false
    },
    resetSelectedTask(state) { 
      state.selectedTask = "NONE"
    },
    updateTask(state, {id, name, details, important}) {
      const task = bfs(state.items, task => task.id === id, task => task.subtasks) || {}
      task.name = name;
      task.details = details;
      task.important = important;
      state.isTaskInfoVisible = false;
    }, 
    displayTaskInfo(state, id) {
      state.taskToDisplay = id;
      state.isTaskInfoVisible = true
    },
    displayTaskSubtasks(state, id){
      state.selectedTask = id;
    },
    openAddTaskPanel(state, status) {
      state.createNewTask.status = status;
      state.createNewTask.isAddingTask = true;
    },
    updateTaskName(state, {id, name}) {
      const task = bfs(state.items, task => task.id === id, task => task.subtasks) || {}
      task.name = name;
    } 
  },
});

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
