<template>
    <section class="container mt-4">
        <div class="container-fluid text-center">
            <h2>Blogs</h2>
            <p>Note: blogs are store in your browser's local storage.</p>
            <p>Create your own blog here, and access them in the table.</p>
            <PagesTable :pages="state.pages"></PagesTable>
        </div>
    </section>
</template>
<script setup>
import PagesTable from "./PagesTable.vue"

import { inject, reactive } from "vue";

const $pages = inject("$pages")
const state = reactive({ pages: !$pages.getAllPages() ? [] : [...$pages.getAllPages()] })

const $bus = inject("$bus")

$bus.$on("refreshPages", () =>{ 
    state.pages = [...$pages.getAllPages()];
})

$bus.$on("deletePage", (id) =>{ 
    $pages.deletePage(id)
    state.pages = [...$pages.getAllPages()];
})


</script>