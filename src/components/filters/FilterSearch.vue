<template>
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

const props = defineProps({
  modelValue: String
});
const emit = defineEmits(["update:modelValue", "apply"]);

const internalValue = ref(props.modelValue || "");

// следим за изменениями извне
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal || "";
  }
);

function onInput(event) {
  internalValue.value = event.target.value;
  emit("update:modelValue", internalValue.value);
  emit("apply");
}
</script>
