<template>
    <div>
        <div class="task-add-area">
            <TaskAddButton :onClick="createTask" />
        </div>
        <div class="task-list" v-for="task in tasks" :key="task.id">
            <TaskItem
                :id="task.id"
                :name="task.name"
                :isEdit="task.isEdit"
                @updateTask="updateTask"
                @changeEditState="changeEditState"
            />
        </div>
    </div>
</template>

<script>
import TaskAddButton from '../molecules/TaskAddButton.vue';
import TaskItem from '../molecules/TaskItem.vue';

export default {
    name: 'TaskList',
    components: {
        TaskItem,
        TaskAddButton,
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

<style scoped>
.task-add-area {
    display: flex;
    align-items: center;
    height: 40px;
    margin: 0 2px 0 6px;
}
</style>
