<template>
  <div class="border rounded-lg shadow-sm p-3 flex flex-col gap-2 hover:shadow-md transition bg-gray">
    <div class="flex justify-between items-start">
      <div class="flex-1 flex flex-col gap-2">
        <TaskTitle :title="task.title" @update="updateTitle" />

        <TaskStatus :status="task.status" @update="updateStatus" />

        <TaskTags :tags="task.tags" @update="updateTags" />

        <SubtaskList :subtasks="task.subtasks" @update="updateSubtasks" />
      </div>

      <TaskActions
        @delete="$emit('delete', task.id)"
        @addSubtask="addSubtask"
      />
    </div>
  </div>
</template>

<script setup>
import SubtaskList from "./items/SubtaskList.vue";
import TaskTitle from "./items/TaskTitle.vue";
import TaskStatus from "./items/TaskStatus.vue";
import TaskTags from "./items/TaskTags.vue";
import TaskActions from "./items/TaskActions.vue";

const props = defineProps({
  task: Object,
});
const emit = defineEmits(["update", "delete"]);

/* ---- Обновления ---- */
function updateTitle(newTitle) {
  props.task.title = newTitle.trim();
  props.task.updatedAt = new Date().toISOString();
  emit("update", props.task);
}

function updateStatus(newStatus) {
  props.task.status = newStatus;
  props.task.updatedAt = new Date().toISOString();
  emit("update", props.task);
}

function updateTags(newTags) {
  props.task.tags = newTags;
  props.task.updatedAt = new Date().toISOString();
  emit("update", props.task);
}

function updateSubtasks(newSubtasks) {
  props.task.subtasks = newSubtasks;
  props.task.updatedAt = new Date().toISOString();
  emit("update", props.task);
}

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
  props.task.subtasks.unshift(newSub);
  emit("update", props.task);
}
</script>
