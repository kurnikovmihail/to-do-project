<template>
  <div class="flex flex-col gap-8">
    <button
      @click="$emit('delete')"
      class="text-red-500 hover:text-red-700 font-bold ml-2 px-3 py-1 border border-red-500 rounded transition"
    >
      Удалить
    </button>
    <button
      @click="$emit('addSubtask')"
      class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 font-bold ml-2 border transition"
    >
      + Задача
    </button>
  </div>
</template>
