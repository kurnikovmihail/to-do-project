<template>
  <div>
    <!-- Кнопка показать/скрыть -->
    <FilterToggle :show="showFilters" @toggle="showFilters = !showFilters" />

    <!-- Панель фильтров -->
    <div v-if="showFilters" class="flex flex-col gap-2 mb-4">
      <FilterSearch v-model="localFilters.search" @apply="applyFilters" />
      <FilterStatus v-model="localFilters.statuses" :all-statuses="allStatuses" @apply="applyFilters" />
      <FilterTags v-model="localFilters.tags" :all-tags="allTags" @apply="applyFilters" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { loadData, saveData } from "../utils/storage.js";

import FilterToggle from "./filters/FilterToggle.vue";
import FilterSearch from "./filters/FilterSearch.vue";
import FilterStatus from "./filters/FilterStatus.vue";
import FilterTags from "./filters/FilterTags.vue";

const props = defineProps({
  tasks: Array
});
const emit = defineEmits(["filtered-tasks"]);

const showFilters = ref(false);

// Загружаем сохранённые фильтры
const data = loadData();
const localFilters = ref({
  statuses: [...data.filters.statuses],
  tags: [...data.filters.tags],
  search: data.filters.search || ""
});

// Все статусы
const allStatuses = ["todo", "in-progress", "done"];

// Уникальные теги
const allTags = computed(() => {
  const tagsSet = new Set();
  props.tasks.forEach(task => {
    task.tags.forEach(t => tagsSet.add(t));
    task.subtasks?.forEach(sub => sub.tags.forEach(t => tagsSet.add(t)));
  });
  return Array.from(tagsSet);
});

// Фильтрация задач
const filteredTasks = computed(() => {
  if (!showFilters.value) return props.tasks;

  return props.tasks.filter(task => {
    if (!localFilters.value.statuses.includes(task.status)) return false;
    if (localFilters.value.tags.length && !task.tags.some(tag => localFilters.value.tags.includes(tag))) return false;
    if (localFilters.value.search && !task.title.toLowerCase().includes(localFilters.value.search.toLowerCase())) return false;
    return true;
  });
});

function applyFilters() {
  saveData({ projects: [{ tasks: props.tasks }], filters: localFilters.value });
  emit("filtered-tasks", filteredTasks.value);
}

// Реактивные пересчёты
watch(() => props.tasks, applyFilters, { deep: true });
watch(showFilters, applyFilters);
</script>
