<template>
    <div>
        <div class="todo-header">
            <AppName />
        </div>
        <div>
            <TaskList
                :tasks="tasks"
                @createTask="createTask"
                @updateTask="updateTask"
                @changeEditState="changeEditState"
            />
        </div>
    </div>
</template>

<script>
import AppName from '../atoms/AppName.vue';
import TaskList from '../organisms/TaskList.vue';

export default {
    name: 'App',
    components: {
        AppName,
        TaskList,
    },
    props: {
        tasks: { type: Array, required: true },
    },
    methods: {
        createTask: function() {
            this.$emit('createTask');
        },
        updateTask: async function(id, name, completed) {
            this.$emit('updateTask', id, name, completed);
        },
        changeEditState: function(id, isEdit) {
            this.$emit('changeEditState', id, isEdit);
        },
    },
    emits: ['createTask', 'updateTask', 'changeEditState'],
};
</script>

<style>
.todo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 64px;
    padding: 0 16px;
    background-color: #ffffff;
    border-bottom: 1px solid #f1f3f4;
}
</style>
