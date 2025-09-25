<template>
  <div class="ml-4 mt-2 space-y-1">
    <div
      v-for="(sub, index) in localSubtasks"
      :key="sub.id"
      class="flex items-center gap-2 justify-between"
    >
      <!-- Чекбокс -->
      <input
        type="checkbox"
        v-model="sub.status"
        :true-value="'done'"
        :false-value="'todo'"
        @change="updateParent"
      />

      <!-- Подзадача текст -->
      <template v-if="!editingIndexMap[index]">
        <div class="w-[426px] overflow-hidden">
          <p
            @click="startEdit(index)"
            :class="[
              'cursor-pointer',
              sub.status === 'done'
                ? 'line-through text-gray-400'
                : 'text-gray-200',
            ]"
            class="ml-1 flex-1 text-start truncate"
          >
            {{ sub.title || "Новая подзадача" }}
          </p>
        </div>
        <button @click="removeSubtask(index)" class="text-red-400 text-xs">
          x
        </button>
      </template>

      <!-- Input для редактирования -->
      <template v-else>
        <input
          v-model="localSubtasks[index].title"
          @blur="saveEdit(index)"
          @keyup.enter="saveEdit(index)"
          class="border px-1 py-0.5 rounded flex-1"
          placeholder="Название подзадачи"
          ref="editInputs"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";

const props = defineProps({
  subtasks: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update"]);

// Подзадачи
const localSubtasks = ref([...props.subtasks]);
const editingIndexMap = ref({});
const editInputs = ref([]);

// watch оставляем только для внешних изменений, чтобы не перезаписывать локальные
watch(
  () => props.subtasks,
  (newVal) => {
    // Обновляем локальные только если длинна отличается или элементы не совпадают
    if (newVal.length !== localSubtasks.value.length) {
      localSubtasks.value = [...newVal];
    }
  },
  { deep: true }
);

function addSubtask() {
  const newSub = {
    id: crypto.randomUUID(),
    title: "",
    status: "todo",
    tags: [],
    subtasks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Добавляем в локальные
  localSubtasks.value.unshift(newSub);
  editingIndexMap.value[0] = true;
  nextTick(() => {
    if (editInputs.value[0]) editInputs.value[0].focus();
  });

  // Сразу уведомляем родителя
  updateParent();
}
function updateParent() {
  emit("update", [...localSubtasks.value]);
}

function startEdit(index) {
  editingIndexMap.value[index] = true;
  nextTick(() => {
    if (editInputs.value[index]) editInputs.value[index].focus();
  });
}

function saveEdit(index) {
  const title = localSubtasks.value[index].title.trim();
  if (!title) {
    localSubtasks.value.splice(index, 1);
  }
  delete editingIndexMap.value[index];
  updateParent();
}

function removeSubtask(index) {
  localSubtasks.value.splice(index, 1);
  updateParent();
}
</script>
