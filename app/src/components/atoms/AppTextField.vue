<template>
  <textarea rows="1" :value="value" ref="input" @input="update" />
</template>

<script>
export default {
  name: 'TextField',
  props: {
    value: { type: String, required: true }
  },
  emits: ['update'],
  methods: {
    focus: function () {
      this.$refs.input.focus();
    },
    select: function () {
      this.$refs.input.select();
    },
    update: function (e) {
      if (e.target.scrollHeight > 20) {
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
      this.$emit('update', e.target.value);
    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 20px;
  resize: none;
  background-color: transparent;
}
</style>
