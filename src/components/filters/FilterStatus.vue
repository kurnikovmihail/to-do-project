<template>
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

const props = defineProps({
  modelValue: Array,
  allStatuses: Array
});
const emit = defineEmits(["update:modelValue", "apply"]);

const internalValue = ref([...props.modelValue]);

// Следим за изменениями извне
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = [...newVal];
  }
);

function toggleStatus(status) {
  if (internalValue.value.includes(status)) {
    internalValue.value = internalValue.value.filter((s) => s !== status);
  } else {
    internalValue.value.push(status);
  }
  emit("update:modelValue", internalValue.value);
  emit("apply");
}
</script>
