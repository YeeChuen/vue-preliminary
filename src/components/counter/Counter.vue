<template>
    <section class="container mt-4">
        <div class="container-fluid text-center">
            <h2>Basic Counter</h2>
            <button :class="`btn btn-outline-${getOppositeTheme}`" @click.prevent="increment">Click(s): {{ count
                }}</button>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { inject } from "vue";

const getOppositeTheme = inject("getOppositeTheme")

const count = ref(0)

function increment() {
    // .value is needed in JavaScript
    count.value++
}
</script>