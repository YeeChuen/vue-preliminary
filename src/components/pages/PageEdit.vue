<template>
    <section class="container mt-4">
        <div class="container-fluid text-center">
            <h2>Edit Blog</h2>
            <form :class="`container text-start border border-${getOppositeTheme} rounded`">
                <div :class="`row  bg-${getOppositeTheme}-subtle rounded-top`">
                    <div class="col-8">
                        <div class="my-3 d-flex flex-column gap-2">
                            <div>
                                <label for="name" class="form-label">Blog name</label>
                                <input class="form-control" type="text" id="name" placeholder="Blog name"
                                    v-model="formState.name" />
                            </div>

                            <div>
                                <label for="content" class="form-label">Blog content</label>
                                <textarea class="form-control" type="text" id="content" placeholder="Blog content"
                                    rows="4" v-model="formContent"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="my-3 d-flex flex-column gap-2">
                            <div>
                                <label for="link" class="form-label">Link name</label>
                                <input class="form-control" type="text" id="link" placeholder="Link name"
                                    v-model="formState.link" />
                            </div>
                            <div>
                                <label for="blog-id" class="form-label">Blog id</label>
                                <input class="form-control" type="text" id="blog-id" placeholder="Blog id"
                                    v-model="formState.id" disabled="true"/>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="publish"
                                    v-model="formState.publish">
                                <label class="form-check-label" for="publish">
                                    Publish
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="`row  bg-${getOppositeTheme}-subtle text-start rounded-bottom`">
                    <div class="mb-3 d-flex justify-content-between">
                        <RouterLink  
                        :to="`/blogs/${page.id}`"
                        :class="`btn btn-outline-${getOppositeTheme} btn-sm`">Back</RouterLink>
                        <input type="submit" value="Save" class="btn btn-outline-primary btn-sm"
                            @click.prevent="handleSubmit()">
                    </div>
                    <!-- <label for="test" class="form-label">Test</label> -->
                    <!-- <input class="form-control" type="text" id="test" placeholder="test" v-model="test" /> -->
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>
import { defineProps, inject, reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["index"])

// const theme = inject("theme")
const getOppositeTheme = inject("getOppositeTheme")
const $bus = inject("$bus")
const $pages = inject("$pages")

// ensure that events is initialize. all $on events is initialize
// pages local storage initialize, is not initialize, its null.
$bus.$emit("checkPagesIsInitialized")

const page = { ...$pages.getPageById(props.index) }
if (!$pages.getPageById(props.index)) {
    router.push("/blogs")
}

const formState = reactive({ ...page })
const formContent = ref(formState.content.join('\n'))

const isFormValid = computed(() => {
    return !formState.name || !formState.content || !formState.link || !formState.id ? false : true;
})


function handleSubmit() {
    if (isFormValid.value) {
        $pages.updatePage({
            name: formState.name,
            content: formContent.value,
            link: formState.link,
            id: page.id,
            publish: formState.publish
        }, page.id)
        $bus.$emit("refreshPages") // <-- rerender pages
        router.push(`/blogs/${page.id}`)
    } else {
        alert("invalid form")
    }
}

</script>