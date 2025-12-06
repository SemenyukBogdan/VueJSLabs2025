<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { computed, onMounted, ref, watch } from 'vue'

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


const STORAGE_KEY = 'tasks'

const list = ref<Task[]>([])

const newTaskTitle = ref('')
const newTaskDescription = ref('')
const newTaskPriority = ref<Priority>('medium')

const fTitle = ref('')
const fDescription = ref('')
const fIsComplete = ref<null | boolean>(null) // null = All, false = Active, true = Done
const fPriority = ref<'all' | Priority>('all')
const fFrom = ref('') // YYYY-MM-DD
const fTo = ref('')   // YYYY-MM-DD

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return

  const parsed = JSON.parse(saved) as Array<Omit<Task, 'createdAt'> & { createdAt: string }>
  list.value = parsed.map(t => ({
    ...t,
    createdAt: t.createdAt ? new Date(t.createdAt) : new Date(),
  }))
})

watch(
  list,
  (newList) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList))
  },
  { deep: true }
)

const total = computed(() => list.value.length)
const active = computed(() => list.value.filter(t => !t.isComplete).length)
const completed = computed(() => list.value.filter(t => t.isComplete).length)

const filteredList = computed(() => {
  const titleQ = fTitle.value.trim().toLowerCase()
  const descQ = fDescription.value.trim().toLowerCase()

  const from = fFrom.value ? new Date(fFrom.value + 'T00:00:00') : null
  const to = fTo.value ? new Date(fTo.value + 'T23:59:59') : null

  return list.value.filter(t => {
    const okTitle = !titleQ || t.title.toLowerCase().includes(titleQ)
    const okDesc = !descQ || t.description.toLowerCase().includes(descQ)

    const okStatus = fIsComplete.value === null || t.isComplete === fIsComplete.value
    const okPriority = fPriority.value === 'all' || t.priority === fPriority.value

    const created = t.createdAt
    const okFrom = !from || created >= from
    const okTo = !to || created <= to

    return okTitle && okDesc && okStatus && okPriority && okFrom && okTo
  })
})


function createTask() {
  const title = newTaskTitle.value.trim()
  const description = newTaskDescription.value.trim()
  if (!title || !description) return

  list.value.push({
    id: uuid(),
    title,
    description,
    isComplete: false,
    editMode: false,
    createdAt: new Date(),
    priority: newTaskPriority.value,
  })

  newTaskTitle.value = ''
  newTaskDescription.value = ''
  newTaskPriority.value = 'medium'
}

function removeTask(id: string) {
  list.value = list.value.filter(task => task.id !== id)
}

function editTask(id: string) {
  const task = list.value.find(task => task.id === id)
  if (task) task.editMode = true
}

function saveTask(id: string) {
  const task = list.value.find(task => task.id === id)
  if (task) task.editMode = false
}

function clearFilters() {
  fTitle.value = ''
  fDescription.value = ''
  fIsComplete.value = null
  fPriority.value = 'all'
  fFrom.value = ''
  fTo.value = ''
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
    <input v-model="newTaskDescription" type="text" placeholder="Description">
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
