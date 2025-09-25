<template>
  <div>
    <!-- Кнопка показать/скрыть панель фильтров -->
    <FilterToggle :show="showFilters" @toggle="showFilters = !showFilters" />

    <!-- Панель фильтров, отображается только при showFilters -->
    <div v-if="showFilters" class="flex flex-col gap-2 mb-4">
      <!-- Поиск по названию задачи -->
      <FilterSearch v-model="localFilters.search" @apply="applyFilters" />

      <!-- Фильтр по статусам -->
      <FilterStatus 
        v-model="localFilters.statuses" 
        :all-statuses="allStatuses" 
        @apply="applyFilters" 
      />

      <!-- Фильтр по тегам -->
      <FilterTags 
        v-model="localFilters.tags" 
        :all-tags="allTags" 
        @apply="applyFilters" 
      />
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

/* --- Props и Events --- */
const props = defineProps({ tasks: Array });
const emit = defineEmits(["filtered-tasks"]);

/* --- Панель фильтров --- */
const showFilters = ref(false);

// Загружаем сохранённые фильтры из LocalStorage
const data = loadData();
const localFilters = ref({
  statuses: [...data.filters.statuses],
  tags: [...data.filters.tags],
  search: data.filters.search || ""
});

/* --- Доступные статусы и уникальные теги --- */
const allStatuses = ["todo", "in-progress", "done"];
const allTags = computed(() => {
  const tagsSet = new Set();
  props.tasks.forEach(task => {
    task.tags.forEach(t => tagsSet.add(t));
    task.subtasks?.forEach(sub => sub.tags.forEach(t => tagsSet.add(t)));
  });
  return Array.from(tagsSet);
});

/* --- Фильтрация задач --- */
const filteredTasks = computed(() => {
  if (!showFilters.value) return props.tasks;

  return props.tasks.filter(task => {
    if (!localFilters.value.statuses.includes(task.status)) return false;
    if (localFilters.value.tags.length && !task.tags.some(tag => localFilters.value.tags.includes(tag))) return false;
    if (localFilters.value.search && !task.title.toLowerCase().includes(localFilters.value.search.toLowerCase())) return false;
    return true;
  });
});

// Применение фильтров и уведомление родителя
function applyFilters() {
  saveData({ projects: [{ tasks: props.tasks }], filters: localFilters.value });
  emit("filtered-tasks", filteredTasks.value);
}

/* --- Реактивные пересчёты при изменении задач или панели --- */
watch(() => props.tasks, applyFilters, { deep: true });
watch(showFilters, applyFilters);
</script>
