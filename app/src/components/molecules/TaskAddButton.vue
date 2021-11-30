<template>
  <Button class="task-add-button" :onClick="handleClick">
    <div class="task-add-icon">
      <TaskAddIcon />
    </div>
    <div class="task-add-message">タスクを追加</div>
  </Button>
</template>

<script>
import TaskAddIcon from '../atoms/TaskAddIcon.vue';
import Button from '../atoms/Button.vue';

export default {
  name: 'TaskAddButton',
  components: {
    TaskAddIcon,
    Button
  },
  props: {
    onClick: { type: Function, required: true }
  },
  methods: {
    handleClick: function () {
      this.onClick();
    }
  }
};
</script>

<style scoped>
.task-add-button {
  height: 32px;
  font-size: 14px;
  color: #1a73e8;
  border-radius: 20px;
}

.task-add-button:hover {
  background: #f8f9fa;
}
.task-add-icon {
  margin: 0 16px 0 8px;
}
.task-add-message {
  margin-right: 8px;
}
</style>
