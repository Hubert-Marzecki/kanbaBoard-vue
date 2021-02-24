import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";

Vue.use(Vuex);
Vue.config.productionTip = false;
import { v4 as uuidv4 } from "uuid";
import {bfs, toList} from "./utils";
function task ({name, status, important, subtasks }){
  return {
    id: uuidv4(),
    name: name,
    details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
    status: status,
    important: important,
    subtasks: subtasks,
  } 
}
const store = new Vuex.Store({
  state: {
    items: [
      task({
        name: "0",
        status: "Tasks",
        important: "Medium",
        subtasks: [],
      }),
      task({
        name: "2",
        important: "Medium",
        status: "Pending Issue",
        subtasks: [
          task({
            name: "01",
            important: "Medium",
            status: "In Progress",
            subtasks: [],
          }),
          task({
            name: "21",
            important: "Medium",
            status: "Under Review",
            subtasks: [
              task({
                name: "Namo",
                important: "Medium",
                status: "Under Review",
                subtasks: [],
              }),
              task({
                name: "Namo",
                important: "Medium",
                status: "Done",
                subtasks: [],
              }),
            ],
          }),
        ]
      }),  
      task({
        name: "02",
        status: "In Progress",
        important: "Medium",
        subtasks: [],
      }),
      task({
        name: "03",
        status: "Under Review",
        important: "Low",
        subtasks: [],
      }),
      task({
        name: "04",
        status: "Under Review",
        important: "Height",
        subtasks: [],
      })
    
    ],
    createNewTask: {
      isAddingTask: false,
      status: "",
    },
    selectedTask: "NONE",
    taskToDisplay: "",
    isTaskInfoVisible: false
  },
  mutations: {
    addTask(state, newTask){
      const allTasks = state.items;
      const selectedTask = state.selectedTask;
      const parentTasks = selectedTask === "NONE"
          ? allTasks        
          : findTask(allTasks, task => task.id === selectedTask)?.subtasks || []
      parentTasks.push(newTask);
      state.items = [...allTasks];
      state.createNewTask.isAddingTask = false;
    },
    closeAddNewTask(state) {
      state.createNewTask.isAddingTask = false
    },
    closeItemInfo(state) {
      state.isTaskInfoVisible = false
    },
    resetSelectedTask(state) { 
      state.selectedTask = "NONE"
    },
    updateTask(state, {id, name, details, important}) {
      const task = findTask(state.items, task => task.id === id) || {}
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
      const task = findTask(state.items, task => task.id === id) || {}
      task.name = name;
    } ,
    updateTaskStatus(state, {id, status}) {
      const task = findTask(state.items, task => task.id === id) || {}
      task.status = status
    },
    deleteTask(state, id) {
      const allTasks = state.items
       const tasksWithTarget = state.selectedTask === "NONE"
       ? allTasks
       : findTask(state.items, task => task.subtasks.some(child => child.id === id))?.subtasks || []
       const taskIdx = tasksWithTarget.findIndex(task => task.id === id)
       tasksWithTarget.splice(taskIdx, 1)
       state.isTaskInfoVisible = false;
    }
  },
});

function findTask(tasks, predicate) {
  return bfs(tasks, predicate, task => task.subtasks);
}

new Vue({
  render: (h) => h(App),
  store,
}).$mount("#app");
