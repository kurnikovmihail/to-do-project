<template>
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

const props = defineProps({
  modelValue: Array,
  allTags: Array
});
const emit = defineEmits(["update:modelValue", "apply"]);

const internalValue = ref([...props.modelValue]);

// Синхронизация при изменении извне
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = [...newVal];
  }
);

function toggleTag(tag) {
  if (internalValue.value.includes(tag)) {
    internalValue.value = internalValue.value.filter((t) => t !== tag);
  } else {
    internalValue.value.push(tag);
  }
  emit("update:modelValue", internalValue.value);
  emit("apply");
}
</script>
