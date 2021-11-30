<template>
    <div>
        <div>
            <TodoList />
        </div>
        <div>
            <TaskList
                :tasks="tasks"
                @createNewTask="createNewTask"
                @addTask="addTask"
                @doneTask="doneTask"
                @changeEditState="changeEditState"
            />
        </div>
    </div>
</template>

<script>
import TodoList from './components/templates/TodoList.vue';

export default {
    name: 'App',
    components: {
        TodoList,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
