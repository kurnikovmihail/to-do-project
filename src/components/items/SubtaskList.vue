<template>
  <div class="ml-4 mt-2 space-y-1">
    <div
      v-for="(sub, index) in localSubtasks"
      :key="sub.id"
      class="flex items-center gap-2 justify-between"
    >
      <!-- Чекбокс для отметки выполнения подзадачи -->
      <input
        type="checkbox"
        v-model="sub.status"
        :true-value="'done'"
        :false-value="'todo'"
        @change="updateParent"
      />

      <!-- Отображение текста подзадачи -->
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

      <!-- Input для редактирования подзадачи -->
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

// Локальная копия подзадач для редактирования
const localSubtasks = ref([...props.subtasks]);

// Карта редактируемых подзадач (индекс => true)
const editingIndexMap = ref({});

// Ссылки на input для фокуса при редактировании
const editInputs = ref([]);

// Слежение за изменениями извне, чтобы обновлять локальные данные только если изменилась длина массива
watch(
  () => props.subtasks,
  (newVal) => {
    if (newVal.length !== localSubtasks.value.length) {
      localSubtasks.value = [...newVal];
    }
  },
  { deep: true }
);

// Добавление новой подзадачи
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

  localSubtasks.value.unshift(newSub);
  editingIndexMap.value[0] = true;

  // Фокус на новом input после рендера
  nextTick(() => {
    if (editInputs.value[0]) editInputs.value[0].focus();
  });

  // Обновляем родителя
  updateParent();
}

// Эмит изменений родителю
function updateParent() {
  emit("update", [...localSubtasks.value]);
}

// Начало редактирования подзадачи
function startEdit(index) {
  editingIndexMap.value[index] = true;
  nextTick(() => {
    if (editInputs.value[index]) editInputs.value[index].focus();
  });
}

// Сохранение изменений подзадачи
function saveEdit(index) {
  const title = localSubtasks.value[index].title.trim();
  if (!title) {
    localSubtasks.value.splice(index, 1);
  }
  delete editingIndexMap.value[index];
  updateParent();
}

// Удаление подзадачи
function removeSubtask(index) {
  localSubtasks.value.splice(index, 1);
  updateParent();
}
</script>
