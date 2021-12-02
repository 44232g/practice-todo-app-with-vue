<template>
    <div>
        <div class="todo-header">
            <AppName />
        </div>
        <div>
            <TaskList
                :tasks="computedTasks"
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
    data() {
        return { tasks: [] };
    },
    methods: {
        createTask: async function() {
            const response = await fetch('/items', {
                method: 'POST',
                body: JSON.stringify({ name: '' }),
                headers: { 'Content-Type': 'application/json' },
            });
            const task = await response.json();
            this.tasks.push({ ...task, isEdit: true });
        },
        updateTask: async function(id, name, completed) {
            const response = await fetch(`/items/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name,
                    completed,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
            const updatedTask = await response.json();
            this.tasks = this.tasks.map(task => {
                return task.id !== id
                    ? { ...task, isEdit: false }
                    : { ...updatedTask, isEdit: false };
            });
        },
        changeEditState: function(id, isEdit) {
            const task = this.tasks.find(task => task.id === id);
            task.isEdit = isEdit;
        },
    },
    async beforeMount() {
        const data = await fetch('/items');
        const json = await data.json();
        this.tasks = json.map(it => {
            return { ...it, isEdit: false };
        });
    },
    computed: {
        computedTasks() {
            return this.tasks.filter(it => !it.completed).reverse();
        },
    },
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
