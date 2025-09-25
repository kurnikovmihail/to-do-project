<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">ToDo List</h1>

    <TaskForm />

    <div class="mt-4">
      <TaskItem 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task"
        @delete="deleteTask"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskItem from './components/TaskItem.vue'
import { loadData, saveData } from './utils/storage.js'

const data = loadData()
const tasks = ref(data.projects[0]?.tasks || [])

function deleteTask(id) {
  const index = tasks.value.findIndex(t => t.id === id)
  if (index !== -1) {
    tasks.value.splice(index, 1)
    data.projects[0].tasks = tasks.value
    saveData(data)
  }
}
</script>
