<template>
    <section>
        <div class="text-end m-2">
            <RouterLink to="/blogs/create" :class="`btn btn-outline-${getOppositeTheme} btn-sm`">
                Create Blog
            </RouterLink>
        </div>
        <table class="table table-striped table-hover text-start">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Link</th>
                    <th style="width:15%">Publish</th>
                    <th style="width:15%">Actions</th>
                </tr>
            </thead>
            <tbody v-if="props.pages.length > 0">
                <tr v-for="page in props.pages" :key="page.id" >
                    <td>{{ page.name }}</td>
                    <td><RouterLink :to="`/blogs/${page.id}`" class="text-decoration-none">{{ page.link }}</RouterLink></td>
                    <td>{{ `${page.publish ? "Yes" : "No"}` }}</td>
                    <td>
                            <button class="btn btn-outline-danger btn-sm"
                                @click.prevent="handleDelete(page.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="props.pages.length === 0"> No data </div>
    </section>
</template>

<script setup>
import { inject, defineProps } from "vue";
const getOppositeTheme = inject("getOppositeTheme")
const props = defineProps(["pages"])
const $bus = inject("$bus")

const handleDelete = (id) => {
    $bus.$emit("deletePage", (id))
}
</script>