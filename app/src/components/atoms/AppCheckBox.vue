<template>
  <div class="checkbox" @click="$emit('check', $event.target.value)" />
</template>

<script>
export default {
  name: 'CheckBox',
  emits: ['check']
};
</script>

<style scoped>
.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #80868b;
  cursor: pointer;
}
.checkbox:hover {
  width: 28px;
  height: 28px;
  border: 0;
  background-image: url(../../assets/done@1x.png);
  background-size: 816px 48px;
  background-position: -11px -11px;
  background-repeat: no-repeat;
  background-color: #f3f4f5;
}
</style>
