<template>
  <!-- Выпадающий список для выбора статуса задачи -->
  <select
    v-model="localStatus"                    
    @change="emit('update', localStatus)"    
    class="rounded px-1 py-0.5 text-sm font-medium mt-1"
    :class="statusClasses[localStatus]"      
  >
    <option value="todo">Todo</option>
    <option value="in-progress">In Progress</option>
    <option value="done">Done</option>
  </select>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ status: String });   // Получаем текущий статус задачи
const emit = defineEmits(["update"]);            // Событие для обновления статуса у родителя

const localStatus = ref(props.status);          // Локальная копия для реактивного выбора

// Цвета для каждого статуса
const statusClasses = {
  todo: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
};
</script>
