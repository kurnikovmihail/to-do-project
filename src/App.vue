<template>
  <div class="max-w-3xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">ToDo List Курников Михаил</h1>

    <!-- Фильтры -->
    <TaskFilters :tasks="tasks" @filtered-tasks="onFilteredTasks" />

    <!-- Форма добавления -->
    <TaskForm @task-added="addTask" />

    <DataControl :tasks="tasks" @update-tasks="onImportTasks" />
    <!-- Список задач -->
    <div class="mt-4 space-y-2">
      <TaskItem
        v-for="task in displayedTasks"
        :key="task.id"
        :task="task"
        @delete="deleteTask"
        @update="updateTask"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskItem from "./components/TaskItem.vue";
import TaskFilters from "./components/TaskFilters.vue";
import DataControl from "./components/DataControl.vue";
import { loadData, saveData } from "./utils/storage.js";

const data = loadData();
const projects = data.projects.length
  ? data.projects
  : [{ id: crypto.randomUUID(), name: "Default", tasks: [] }];
const tasks = ref(projects[0].tasks);

function onImportTasks(newTasks) {
  tasks.value = newTasks;
  displayedTasks.value = newTasks;
}

const displayedTasks = ref([...tasks.value]);

function onFilteredTasks(newTasks) {
  displayedTasks.value = newTasks;
}

function deleteTask(id) {
  const index = tasks.value.findIndex((t) => t.id === id);
  if (index !== -1) tasks.value.splice(index, 1);
  displayedTasks.value = tasks.value;
  saveData({ projects, filters: data.filters });
}

function addTask(newTask) {
  tasks.value.unshift(newTask);
  displayedTasks.value = [...tasks.value];
  saveData({ projects, filters: data.filters });
}

function updateTask(updatedTask) {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) tasks.value[index] = updatedTask;
  displayedTasks.value = tasks.value;
  saveData({ projects, filters: data.filters });
}
</script>
