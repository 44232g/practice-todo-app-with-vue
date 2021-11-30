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
            fetch('/items', {
                method: 'POST',
                body: JSON.stringify({ name: '' }),
                headers: { 'Content-Type': 'application/json' },
            }).then(r => r.json());
            const data = await fetch('/items');
            const json = await data.json();
            this.tasks = json.map((it, index) => {
                return { ...it, isEdit: index === 0 };
            });
        },
        updateTask: async function(id, name, completed) {
            fetch(`/items/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name,
                    completed,
                }),
                headers: { 'Content-Type': 'application/json' },
            }).then(r => r.json());
            const data = await fetch('/items');
            const json = await data.json();
            this.tasks = json.map(it => {
                return { ...it, isEdit: false };
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
            return this.tasks
                .filter(it => !it.completed)
                .map(it => {
                    return { ...it, isEdit: false };
                })
                .reverse();
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
