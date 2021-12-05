<template>
    <div class="task-item">
        <div class="task-left">
            <div class="task-checkbox">
                <AppCheckBox @check="updateTask(true)" />
            </div>
        </div>
        <div class="task-right">
            <div class="task-input">
                <AppTextField
                    ref="taskNameInput"
                    :value="taskName"
                    @update="taskName = $event"
                />
            </div>
        </div>
    </div>
</template>

<script>
import AppCheckBox from '../atoms/AppCheckBox.vue';
import AppTextField from '../atoms/AppTextField.vue';

export default {
    name: 'TaskItem',
    components: {
        AppCheckBox,
        AppTextField,
    },
    props: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        isEdit: { type: Boolean, required: true, default: false },
    },
    data() {
        return { taskName: this.name };
    },
    methods: {
        updateTask: async function(completed) {
            this.$emit('updateTask', this.id, this.taskName, completed);
        },
        changeEditState: function(e) {
            const clicked = this.$el.contains(e.target) ? true : false;
            if (clicked) {
                this.$refs.taskNameInput.focus();
                this.$refs.taskNameInput.select();
                this.$emit('changeEditState', this.id, clicked);
            } else {
                this.isEdit && this.updateTask(false);
            }
        },
    },
    emits: ['updateTask', 'changeEditState'],
    mounted() {
        if (this.isEdit) {
            this.$refs.taskNameInput.focus();
        }
        window.addEventListener('click', this.changeEditState);
    },
    beforeUnmount() {
        window.removeEventListener('click', this.changeEditState);
    },
};
</script>

<style scoped>
.task-item {
    display: flex;
    min-height: 32px;
    cursor: inherit;
}
.task-item:hover {
    background-color: #f8f9fa;
}
.task-left {
    margin: 2px 14px 0 10px;
}
.task-checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
}
.task-right {
    width: calc(100% - 28px);
    min-height: 28px;
    margin: 2px 10px 0 0;
    padding: 0;
    font-size: 14px;
    line-height: 20px;
}
.task-input {
    margin-top: 6px;
}
</style>
