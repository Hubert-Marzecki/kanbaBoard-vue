<template>
  <div>
    <div id="list">
      <draggable :list="itemsLocal">
        <div class="box" v-for="item in itemsLocal" :class="item.selected ? 'selected' : ''" @click="() => select(item)">
          {{ item.name }}
        </div>
      </draggable>
    </div>
    <p class="new_task" @click="addNewTask">
     &plus; Add new task
    </p>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import {mapState} from "vuex";
import {v4 as uuidv4} from "uuid";

export default {
  name: 'list',
  components: {
    draggable,
  },
  data() {
    return {
      itemsLocal: [
        {
          name: "Loading items",
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.itemsLocal = this.$store.state.items
    }, 500)
  },
  computed: {
    ...mapState(['items'])
  },
  watch: {
    items(val) {
      this.itemsLocal = val
    }
  },
  methods: {
    select(selectedItem) {
      if(this.$store.state.items.find(item => item.name === selectedItem.name)) {
        this.$store.state.items = this.$store.state.items.map((item) => {
          if (item.name === selectedItem.name) {
            item.selected = true
          } else {
            item.selected = false
          }
          return item
        })
      }
      this.itemsLocal = this.$store.state.items
    },
    addNewTask() {
      let count = this.items.length
      this.items.push({
        id: uuidv4(),
        name: `Task ${count + 1}`,
        details: `This is the task ${count + 1} - ut id urna sollicitudin, ornare mauris eu, blandit arcu. Vestibulum pharetra ligula ut bibendum accumsan`,
        selected: false,
      })
    }
  },
}
</script>
<style>
.box {
  border: 1px solid rgba(0,2,51,.125);
  box-shadow:0 0 25px rgba(0,0,0,.10196078431372549);
  background: #ffffff;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  border-radius: 1em;
  color: #000233;
  margin: 1em;
  white-space: nowrap;
  padding: 0 .5em;
  cursor: pointer;
}

.selected {
  font-weight: bold;
}

#list {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.new_task {
  cursor: pointer;
  text-align: right;
  padding: 0 1em;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}

</style>
