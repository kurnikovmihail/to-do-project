<template>
  <div class="flex gap-2 mt-4">
    <!-- Экспорт -->
    <button
      @click="exportData"
      class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 font-bold border transition"
    >
      Экспортировать
    </button>

    <!-- Импорт -->
    <input
      type="file"
      ref="fileInput"
      @change="importData"
      class="hidden"
    />
    <button
      @click="$refs.fileInput.click()"
      class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 font-bold border transition"
    >
      Импортировать
    </button>
  </div>
</template>

<script setup>
import CryptoJS from "crypto-js"; // убедись, что установлено через npm i crypto-js
import { ref } from "vue";
import { saveData, loadData } from '../utils/storage.js'

const props = defineProps({
  tasks: Array,
});
const emit = defineEmits(["update-tasks"]);

const fileInput = ref(null);

// Экспорт данных
function exportData() {
  const key = prompt("Введите ключ для шифрования и запомните его:");
  if (!key) return alert("Ключ обязателен!");

  const dataToExport = JSON.stringify({ tasks: props.tasks });
  const encrypted = CryptoJS.AES.encrypt(dataToExport, key).toString();

  const blob = new Blob([encrypted], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks_export.txt";
  a.click();
  URL.revokeObjectURL(url);
}

// Импорт данных
function importData(event) {
  const key = prompt("Введите ключ для расшифровки:");
  if (!key) return alert("Ключ обязателен!");

  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(e.target.result, key).toString(CryptoJS.enc.Utf8);
      const parsed = JSON.parse(decrypted);
      if (!parsed.tasks) throw new Error("Некорректный формат файла!");

      emit("update-tasks", parsed.tasks);
      saveData({ projects: [{ id: crypto.randomUUID(), name: "Default", tasks: parsed.tasks }], filters: {} });
      alert("Импорт успешно выполнен!");
    } catch (err) {
      alert("Ошибка при расшифровке или формат файла неверный.");
      console.error(err);
    }
  };
  reader.readAsText(file);
}
</script>
