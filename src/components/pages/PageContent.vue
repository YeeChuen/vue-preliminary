<template>
    <section class="container mt-4">
        <div class="container-fluid text-start">
            <div class="text-end mb-3">
                <RouterLink :to="`${page.id}/edit`" class="btn btn-outline-primary btn-sm">Edit</RouterLink>
            </div>
            <div class="d-flex justify-content-between mb-3">
                <h2>{{ page.name }}</h2>
                <div class="d-flex flex-column" style="opacity: .5;">
                    <span>Id: {{ page.id }}</span>
                    <span>Publish: {{ `${page.publish ? "Yes" : "No"}` }}</span>
                </div>
            </div>
            <h5>Content</h5>
            <p v-for="(content, index) in page.content" :key="index">{{ content }}</p>
        </div>
    </section>
</template>

<script setup>
import { defineProps, inject } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["index"])

// const theme = inject("theme")
const $bus = inject("$bus")
const $pages = inject("$pages")

// ensure that events is initialize. all $on events is initialize
// pages local storage initialize, is not initialize, its null.
$bus.$emit("checkPagesIsInitialized")

const page = { ...$pages.getPageById(props.index) }
if (!$pages.getPageById(props.index)) {
    router.push("/blogs")
}

</script>