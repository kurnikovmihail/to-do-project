<template>
  <div class="max-w-3xl mx-auto p-4">
    <!-- Заголовок приложения -->
    <h1 class="text-2xl font-bold mb-4">ToDo List Курников Михаил</h1>

    <!-- Компонент фильтров задач -->
    <TaskFilters :tasks="tasks" @filtered-tasks="onFilteredTasks" />

    <!-- Компонент управления данными: импорт/экспорт -->
    <DataControl :tasks="tasks" @update-tasks="onImportTasks" />

    <!-- Форма добавления новой задачи -->
    <TaskForm @task-added="addTask" />

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

/* --- Загрузка данных --- */
const data = loadData();

// Если проектов нет, создаем дефолтный проект
const projects = data.projects.length
  ? data.projects
  : [{ id: crypto.randomUUID(), name: "Default", tasks: [] }];

/* --- Основные массивы задач --- */
const tasks = ref(projects[0].tasks);          // задачи текущего проекта
const displayedTasks = ref([...tasks.value]);  // задачи с учетом фильтров

/* --- Обработчики событий --- */

// Импорт новых задач через DataControl
function onImportTasks(newTasks) {
  tasks.value = newTasks;
  displayedTasks.value = newTasks;
}

// Обновление отображаемых задач после применения фильтров
function onFilteredTasks(newTasks) {
  displayedTasks.value = newTasks;
}

// Удаление задачи
function deleteTask(id) {
  const index = tasks.value.findIndex((t) => t.id === id);
  if (index !== -1) tasks.value.splice(index, 1);
  displayedTasks.value = tasks.value;
  saveData({ projects, filters: data.filters });
}

// Добавление новой задачи
function addTask(newTask) {
  tasks.value.unshift(newTask);
  displayedTasks.value = [...tasks.value];
  saveData({ projects, filters: data.filters });
}

// Обновление существующей задачи
function updateTask(updatedTask) {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id);
  if (index !== -1) tasks.value[index] = updatedTask;
  displayedTasks.value = tasks.value;
  saveData({ projects, filters: data.filters });
}
</script>
