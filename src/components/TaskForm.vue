<template>
  <form @submit.prevent="submitTask" class="flex gap-2 mb-4">
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

// Для emit события
const emit = defineEmits(['task-added'])

const title = ref('')
const status = ref('todo')
const tagsInput = ref('')

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function submitTask() {
  if (!title.value) return

  const newTask = {
    id: uuidv4(),
    title: title.value,
    status: status.value,
    tags: tagsInput.value.split(',').map(t => t.trim()).filter(Boolean),
    subtasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  // Отправляем событие в App.vue
  emit('task-added', newTask)

  // Сбрасываем форму
  title.value = ''
  status.value = 'todo'
  tagsInput.value = ''
}
</script>
