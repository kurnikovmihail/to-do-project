<template>
  <!-- Поле поиска по названию задачи -->
  <input
    type="text"
    :value="internalValue"
    @input="onInput"
    placeholder="Поиск по названию"
    class="border rounded px-2 py-1 w-full"
  />
</template>

<script setup>
import { ref, watch } from "vue";

/* --- Props и Events --- */
const props = defineProps({
  modelValue: String
});
const emit = defineEmits(["update:modelValue", "apply"]);

/* --- Локальное состояние для input --- */
const internalValue = ref(props.modelValue || "");

/* --- Синхронизация с внешним значением --- */
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal || "";
  }
);

/* --- Обработка ввода пользователя --- */
function onInput(event) {
  internalValue.value = event.target.value;

  // Обновляем v-model у родителя
  emit("update:modelValue", internalValue.value);

  // Уведомляем родителя о необходимости применения фильтра
  emit("apply");
}
</script>
