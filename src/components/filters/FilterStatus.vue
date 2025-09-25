<template>
  <!-- Чекбоксы для фильтрации по статусу -->
  <div class="flex gap-2 items-center">
    <label v-for="status in allStatuses" :key="status" class="flex items-center gap-1">
      <input
        type="checkbox"
        :value="status"
        :checked="internalValue.includes(status)"
        @change="toggleStatus(status)"
      />
      {{ status }}
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

/* --- Props и Events --- */
const props = defineProps({
  modelValue: Array,      // Список выбранных статусов
  allStatuses: Array      // Все доступные статусы
});
const emit = defineEmits(["update:modelValue", "apply"]);

/* --- Локальное состояние для чекбоксов --- */
const internalValue = ref([...props.modelValue]);

/* --- Синхронизация с внешним v-model --- */
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = [...newVal];
  }
);

/* --- Обработка переключения статуса --- */
function toggleStatus(status) {
  if (internalValue.value.includes(status)) {
    internalValue.value = internalValue.value.filter((s) => s !== status);
  } else {
    internalValue.value.push(status);
  }

  // Обновляем v-model у родителя
  emit("update:modelValue", internalValue.value);

  // Уведомляем родителя о необходимости применения фильтра
  emit("apply");
}
</script>
