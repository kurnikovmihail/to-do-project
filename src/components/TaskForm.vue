<template>
  <form @submit.prevent="addTask" class="flex gap-2">
    <input v-model="title" placeholder="Название задачи" class="border rounded px-2 py-1 flex-1"/>
    <select v-model="status" class="border rounded px-2 py-1">
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
    </select>
    <input v-model="tagsInput" placeholder="Теги через запятую" class="border rounded px-2 py-1"/>
    <button type="submit" class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">Добавить</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { saveData, loadData } from '../utils/storage.js'

const title = ref('')
const status = ref('todo')
const tagsInput = ref('')

const data = loadData()
const projects = data.projects.length ? data.projects : [{ id: uuidv4(), name: 'Default', tasks: [] }]

function addTask() {
  if (!title.value) return
  const newTask = {
    id: uuidv4(),
    title: title.value,
    status: status.value,
    tags: tagsInput.value.split(',').map(t => t.trim()).filter(Boolean),
    subtasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  projects[0].tasks.push(newTask)
  saveData({ projects, filters: data.filters })

  title.value = ''
  tagsInput.value = ''
  status.value = 'todo'
}
</script>
