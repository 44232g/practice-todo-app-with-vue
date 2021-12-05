<template>
    <button @click="$emit('click', this.id)"><slot></slot></button>
</template>

<script>
export default {
    name: 'AppButton',
    props: {
        onClick: Function,
    },
    emits: ['click'],
};
</script>

<style scoped>
button {
    display: flex;
    align-items: center;
    width: 100%;
}
</style>
