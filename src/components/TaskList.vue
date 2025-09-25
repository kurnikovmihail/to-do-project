<template>
  <div class="mt-4 space-y-2">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @update="updateTask"
      @delete="deleteTask"
    />
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: Array
})
const emit = defineEmits(['update-task', 'delete-task'])

function updateTask(task) {
  emit('update-task', task)
}

function deleteTask(taskId) {
  emit('delete-task', taskId)
}
</script>
