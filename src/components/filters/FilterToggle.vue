<template>
  <button
    @click="$emit('toggle')"
    class="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800 transition mb-2"
  >
    {{ show ? '- Фильтры' : '+ Фильтры' }}
  </button>
</template>

<script setup>
defineProps({
  show: Boolean
});
defineEmits(["toggle"]);
</script>
