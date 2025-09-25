<template>
  <div class="flex flex-wrap gap-1 items-center mt-1">
    <template v-for="(tag, index) in localTags" :key="index">
      <span
        v-if="!editingTagIndexMap[index]"
        @click="startEditTag(index)"
        class="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded cursor-pointer"
      >
        {{ tag }}
      </span>
      <input
        v-else
        v-model="localTags[index]"
        @blur="saveTag(index)"
        @keyup.enter="saveTag(index)"
        class="border rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
    </template>

    <!-- Новый тег -->
    <div class="flex gap-1 items-center">
      <input
        v-if="addingNewTag"
        v-model="newTag"
        @blur="confirmNewTag"
        @keyup.enter="confirmNewTag"
        placeholder="Новый тег"
        class="border rounded px-1 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
        ref="newTagInput"
      />
      <button
        v-else
        @click="startAddingTag"
        class="bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600 transition"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";

const props = defineProps({ tags: Array });
const emit = defineEmits(["update"]);

const localTags = ref([...props.tags]);
const editingTagIndexMap = ref({});
const addingNewTag = ref(false);
const newTag = ref("");
const newTagInput = ref(null);

function startEditTag(index) {
  editingTagIndexMap.value[index] = true;
}
function saveTag(index) {
  const tag = localTags.value[index].trim();
  if (!tag) localTags.value.splice(index, 1);
  delete editingTagIndexMap.value[index];
  emit("update", [...localTags.value]);
}
function startAddingTag() {
  addingNewTag.value = true;
  nextTick(() => newTagInput.value?.focus());
}
function confirmNewTag() {
  const tag = newTag.value.trim();
  if (tag && !localTags.value.includes(tag)) {
    localTags.value.push(tag);
  }
  newTag.value = "";
  addingNewTag.value = false;
  emit("update", [...localTags.value]);
}
</script>
