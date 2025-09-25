<template>
  <div class="border p-2 rounded mb-2 flex justify-between items-center">
    <div>
      <p class="font-medium">{{ task.title }}</p>
      <p class="text-sm text-gray-500">{{ task.status }} | {{ task.tags.join(', ') }}</p>
    </div>
    <button @click="$emit('delete', task.id)" class="text-red-500 hover:text-red-700">Удалить</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  task: Object
})
</script>
