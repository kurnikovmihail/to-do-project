<template>
  <div>
    <input
      v-if="editing"
      v-model="localTitle"
      @keyup.enter="save"
      @blur="save"
      class="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <p
      v-else
      class="font-semibold cursor-pointer text-white text-start"
      @click="startEdit"
    >
      {{ title }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({ title: String });
const emit = defineEmits(["update"]);

const editing = ref(false);
const localTitle = ref(props.title);

function startEdit() {
  editing.value = true;
}
function save() {
  editing.value = false;
  if (localTitle.value.trim()) {
    emit("update", localTitle.value);
  }
}
</script>
