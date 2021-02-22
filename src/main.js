import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false;
import { v4 as uuidv4 } from "uuid";


const store = new Vuex.Store({
  state: {
    items: [{
      id: uuidv4(),
      name: "Namo",
      details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
      status: "Tasks",
      important: "Medium",
      subtasks: []
    },
      {
        id: uuidv4(),
        name: "Namo",
        details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
        important: "Medium",
        status: "Pending Issue",
        subtasks: [
          {
            id: uuidv4(),
            name: "Namo",
            details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
            important: "Medium",
            status: "In Progress",
            subtasks: []
          },
          {
            id: uuidv4(),
            name: "Namo",
            details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
            important: "Medium",
            status: "UnderReview",
            subtasks: [{
              id: uuidv4(),
              name: "Namo",
              details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
              important: "Medium",
              status: "UnderReview",

            },
              {
                id: uuidv4(),
                name: "Namo",
                details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
                important: "Medium",
                status: "PushLive",
              }
              ]
          },
        ]
      },

      {
        id: uuidv4(),
        name: "Namo",
        details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
        status: "In Progress",
        important: "Medium",
        subtasks: []
      },
      {
        id: uuidv4(),
        name: "Namo",
        details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
        status: "Under Review",
        important: "Medium",
        subtasks: []
      },
      {
        id: uuidv4(),
        name: "Namo",
        details: "Detailo in numeros basedo on sudoku in mountains. Like a bone without the dog pumpkins are cool and coyots are not.",
        status: "Under Review",
        important: "Medium",
        subtasks: []
      },
    ],


    addTask: {
        isAddingTask: false,
        col: ""
    },
    column: {
      tasks: {
        displayName: "Tasks",
        items:[]
      },
      pendingIssue: {
        displayName: "Pending Issue",
        items:[]

      },
      inProgress:
      {
        displayName: "In Progress",
        items:[]

      },
      underReview:{
        displayName: "Under Review",
        items:[]

      },
      pushLive: {
        displayName: "Push Live",
        items:[]
      },
    }
  },
  mutations: {
    addItem (state, item) {
      state.items.push(item)
    },
    selectItem(state, uuid) {
      let select = (i) => {
        i.children.map(select)
        i.selected = i.id === uuid
        return i
      }
      state.items = state.items.map(select)
    },
    rename(state, {uuid, name}) {
      let select = (i) => {
        i.children.map(select)
        if(i.id === uuid) {
          i.name = name
        }
        return i
      }
      state.items = state.items.map(select)
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
