<template>
  <form @submit.prevent="submitTask" class="flex gap-2 mb-4 mt-4">
    <!-- Поле для названия задачи -->
    <input v-model="title" placeholder="Название задачи" class="border rounded px-2 py-1 flex-1"/>

    <!-- Статус задачи -->
    <select v-model="status" class="border rounded px-2 py-1">
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
    </select>

    <!-- Теги через запятую -->
    <input v-model="tagsInput" placeholder="Теги через запятую" class="border rounded px-2 py-1"/>

    <!-- Кнопка добавления задачи -->
    <button type="submit" class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">Добавить</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

// Локальные переменные для формы
const title = ref('')
const status = ref('todo')
const tagsInput = ref('')

// События для родителя
const emit = defineEmits(['task-added'])

// Генерация UUID для новой задачи
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Создаёт новую задачу и эмитит событие родителю
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

  emit('task-added', newTask)

  // Сбрасываем форму после добавления
  title.value = ''
  status.value = 'todo'
  tagsInput.value = ''
}
</script>
