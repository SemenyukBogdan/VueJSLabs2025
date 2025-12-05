<script lang="ts">
import { v4 as uuid } from 'uuid'
type Priority = 'low' | 'medium' | 'high'

type Task = {
  id: string
  title: string
  description: string
  isComplete: boolean
  editMode: boolean
  createdAt: Date
  priority: Priority
}

export default {

  data() {
    return {
      list: [] as Task[],
      newTaskTitle: '',
      newTaskDecription: '',
      newTaskPriority: 'medium' as Priority,

      fTitle: '',
      fDescription: '',
      fIsComplete: null ,      // all | active | done
      fPriority: 'all',    // all | low | medium | high
      fFrom: '',           // 'YYYY-MM-DD'
      fTo: '',             // 'YYYY-MM-DD'

    }
  },
  watch: {
    list: {
      deep: true,
      handler(newList: any) {
        localStorage.setItem('tasks', JSON.stringify(newList))
      }
    }
  },
  methods: {
    createTask() {
      this.newTaskTitle = this.newTaskTitle.trim()
      this.newTaskDecription = this.newTaskDecription.trim()

      if (this.newTaskTitle=== '') {
        return
      }
      if (this.newTaskDecription === '') {
        return
      }

      const newId = uuid();
      this.list.push({
        id: newId,
        title: this.newTaskTitle,
        description: this.newTaskDecription,
        isComplete: false,
        editMode: false,
        createdAt: new Date(),
        priority: this.newTaskPriority,
      })

      // this.newTaskTitle = ''
      // this.newTaskText = ''
    },
    removeTask(id: string) {
      this.list = this.list.filter(task => task.id !== id)
    },
    editTask(id: string) {
      const task = this.list.find(task => task.id === id)
      if (task?.editMode != undefined) {
        task.editMode = true;
      }
    },
    saveTask(id: string) {
      const task = this.list.find(task => task.id === id)
      if (task?.editMode != undefined) {
        task.editMode = false;
      }
    },
    clearFilters(){
      this.fTitle = '',
          this.fDescription= '',
          this.fIsComplete= null ,      // all | active | done
          this.fPriority= 'all',    // all | low | medium | high
          this.fFrom= '',           // 'YYYY-MM-DD'
          this.fTo= ''             // 'YYYY-MM-DD'
    }

  },
  computed: {
    total() {
      return this.list.length
    },
    active() {
      return this.list.filter(task => !task.isComplete).length
    },
    completed() {
      return this.list.filter(task => task.isComplete).length
    },
    filteredList() {
      const titleQ = this.fTitle.trim().toLowerCase()
      const descQ = this.fDescription.trim().toLowerCase()

      const from = this.fFrom ? new Date(this.fFrom + 'T00:00:00') : null
      const to = this.fTo ? new Date(this.fTo + 'T23:59:59') : null

      return this.list.filter((t: any) => {
        const okTitle = !titleQ || (t.title ?? '').toLowerCase().includes(titleQ)
        const okDesc = !descQ || (t.description ?? '').toLowerCase().includes(descQ)

        const okIsComplete = this.fIsComplete === null || t.isComplete === this.fIsComplete
        const okPriority = this.fPriority === 'all' || t.priority === this.fPriority

        const created = t.createdAt instanceof Date ? t.createdAt : new Date(t.createdAt)
        const okFrom = !from || created >= from
        const okTo = !to || created <= to

        return okTitle && okDesc && okIsComplete && okPriority && okFrom && okTo
      })
    },

  },

  created() {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      const parsed = JSON.parse(saved)

      this.list = parsed.map((t: any) => ({
        ...t,
        createdAt: t.createdAt ? new Date(t.createdAt) : new Date()
      }))
    }

  }
}

</script>

<template>
<!--counters-->
  <div>
    <div>Total: {{ total }}</div>
    <div>Active: {{ active }}</div>
    <div>Completed: {{ completed }}</div>
  </div>
  <div class="filters">
    <input v-model="fTitle" placeholder="Filter by title" />
    <input v-model="fDescription" placeholder="Filter by description" />

    <select v-model="fIsComplete">
      <option :value="null" selected>All</option>
      <option :value="false">Active</option>
      <option :value="true">Done</option>
    </select>

    <select v-model="fPriority">
      <option value="all">All</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <input type="date" v-model="fFrom" />
    <input type="date" v-model="fTo" />

    <button @click="clearFilters">Clear filters</button>

    <div class="counters">
      Total: {{ total }} | Active: {{ active }} | Completed: {{ completed }}
    </div>
  </div>

  <div class="new_task">
    <h4>New task</h4>
    <input v-model="newTaskTitle" type="text" placeholder="title" >
    <input v-model="newTaskDecription" type="text" placeholder="text">
    <select v-model="newTaskPriority">
      <option value="low">Low</option>
      <option value="medium" selected>Medium</option>
      <option value="high">High</option>
    </select>

    <button @click.capture="createTask"> create new task </button>
  </div>


<!--  <div class="item-list" v-for="item in list" :key="item.id" @dblclick="editTask(item.id)">-->
  <div class="item-list" v-for="item in filteredList" :key="item.id" @dblclick="editTask(item.id)">
<!--    createdAt-->
    <div>
      <strong> Created at: </strong> {{item.createdAt.toDateString()}}  {{item.createdAt.toLocaleTimeString()}}
    </div>
    <!-- title -->
    <div>
      <strong>title:</strong>

      <template v-if="item.editMode">
        <input v-model="item.title" />
      </template>
      <template v-else>
        {{ item.title }}
      </template>
    </div>

    <!-- text -->
    <div>
      <strong>text:</strong>

      <template v-if="item.editMode">
        <input v-model="item.description" />
      </template>
      <template v-else>
        {{ item.description }}
      </template>
    </div>


    <div>
      <strong>priority: </strong>
      <template v-if="item.editMode">
        <select v-model="item.priority">
          <option value="low">Low</option>
          <option value="medium" selected>Medium</option>
          <option value="high">High</option>
        </select>
      </template>
      <template v-else>
        {{item.priority}}
      </template>

    </div>


<!--    checkbox-->
    <label>
      <input type="checkbox" v-model="item.isComplete" :disabled="item.editMode" />
      {{ item.isComplete ? 'done' : 'Active' }}
    </label>

    <!-- buttons -->
    <div>
      <button class="delete_button"v-if="item.editMode" @click="saveTask(item.id)">Save</button>
      <button  class="delete_button" v-else @click="removeTask(item.id)">Delete</button>
    </div>



  </div>

</template>

<style scoped>

.item-list{
  border: blueviolet 2px solid;
  padding: 10px;
  margin: 5px;
}

.delete_button{
  width: 100%;
}

</style>
