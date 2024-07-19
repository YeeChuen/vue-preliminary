<template>
    <section :class="`container text-center border border-${getOppositeTheme} rounded`">
        <div class="row px-3 pt-3">
            <form class="d-flex flex-row justify-content-between gap-2">
                <div class="flex-grow-1">
                    <input type="text" class="form-control " id="form input new todo" placeholder="Search"
                        v-model="formInput">
                </div>
                <div class="m-auto d-flex gap-2">
                    <input :class="`btn btn-outline-${getOppositeTheme} btn-sm`" type="submit" value="Add"
                        @click.prevent="handleSubmit()">
                        
                    <input :class="`btn btn-outline-danger btn-sm`" type="button" value="Delete All"
                        @click.prevent="handleDeleteAll()">
                </div>
            </form>
        </div>
        <hr :class="`border-${getOppositeTheme}`" />

        <div class="row p-3">
            <div class="container">
                <div v-if="state.todos.length === 0">
                    No todos {{ formInput.value }}
                </div>
                <TodolistItem :todos="state.todos"></TodolistItem>
            </div>
        </div>
    </section>

</template>

<script setup>
import { inject, ref, reactive } from 'vue';
import TodolistItem from "./TodolistItem.vue"

const getOppositeTheme = inject("getOppositeTheme")

const $bus = inject("$bus");
const $todos = inject("$todos");
const formInput = ref("");
const state = reactive({todos: !$todos.getAllTodos() ? [] : [...$todos.getAllTodos()]})

function handleSubmit() {
    try {
        if (formInput.value === "") {
            throw Error("No input value.")
        }
        let id = Math.floor(1000 + Math.random() * 9000);
        id = 2822

        while (state.todos.some((data) => data.id === id)) {
            id = Math.floor(1000 + Math.random() * 9000);
        }

        const newTodo = {
            content: formInput.value,
            id: id,
            complete: false,
        }
        $todos.createTodo(newTodo)
        $bus.$emit("refreshTodo")
        formInput.value = ""
    } catch (error) {
        alert(error)
    }
}

function handleDeleteAll() {
    try {
        for (const todo of state.todos) {
            $todos.deleteTodo(todo.id)
        }
        $bus.$emit("refreshTodo")
    } catch (error) {
        console.log(error)
    }
}

$bus.$on("refreshTodo", () => {
    state.todos = [...$todos.getAllTodos()]
})

</script>
<style></style>