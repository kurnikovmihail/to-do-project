<template>
  <div>
    <!-- Input для редактирования заголовка -->
    <input
      v-if="editing"
      v-model="localTitle"
      @keyup.enter="save"
      @blur="save"
      class="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <!-- Обычный текст заголовка -->
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

const editing = ref(false); // Состояние редактирования
const localTitle = ref(props.title); // Локальная копия заголовка для редактирования

// Начать редактирование
function startEdit() {
  editing.value = true;
}

// Сохранить новое значение и уведомить родителя
function save() {
  editing.value = false;
  if (localTitle.value.trim()) {
    emit("update", localTitle.value);
  }
}
</script>
