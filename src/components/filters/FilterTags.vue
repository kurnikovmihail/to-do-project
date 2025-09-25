<template>
  <!-- Чекбоксы для фильтрации по тегам -->
  <div class="flex gap-2 items-center flex-wrap">
    <label v-for="tag in allTags" :key="tag" class="flex items-center gap-1">
      <input
        type="checkbox"
        :value="tag"
        :checked="internalValue.includes(tag)"
        @change="toggleTag(tag)"
      />
      {{ tag }}
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

/* --- Props и Events --- */
const props = defineProps({
  modelValue: Array,  // Выбранные теги
  allTags: Array      // Все доступные теги
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

/* --- Обработка переключения тега --- */
function toggleTag(tag) {
  if (internalValue.value.includes(tag)) {
    internalValue.value = internalValue.value.filter((t) => t !== tag);
  } else {
    internalValue.value.push(tag);
  }

  // Обновляем v-model у родителя
  emit("update:modelValue", internalValue.value);

  // Уведомляем родителя о необходимости применения фильтра
  emit("apply");
}
</script>
