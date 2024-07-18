<template>
    <section class="container mt-4">
        <div class="container-fluid text-center">
            <h2>Todolist</h2>
            <p>Note: todos are store in your browser's local storage.</p>
            <TodolistContainer></TodolistContainer>
        </div>
    </section>
</template>

<script setup>
import TodolistContainer from "./TodolistContainer.vue"
</script>