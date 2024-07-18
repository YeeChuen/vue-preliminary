<template>
    <RouterView></RouterView>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const $pages = inject("$pages")
const $bus = inject("$bus")

// ensure that events is initialize. all $on events is initialize
// pages local storage initialize, is not initialize, its null.
$bus.$on("checkPagesIsInitialized", () => {
    if ($pages.getAllPages() === null) {
        router.push("/blogs")
    }
})


</script>