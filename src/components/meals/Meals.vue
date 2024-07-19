<template>
    <section class="container mt-4">
        <div class="container-fluid text-center">
            <h2>The Meals DB</h2>
            <p>Credits to public API <a :class="`link-${getOppositeTheme}`" href="https://www.themealdb.com/" target="_blank" >TheMealDB</a></p>
            <p>Note: data are not processed optimally.</p>
        </div>
        <RouterView></RouterView>
    </section>
</template>
<script setup>
import {inject} from "vue"

const getOppositeTheme = inject("getOppositeTheme")
</script>