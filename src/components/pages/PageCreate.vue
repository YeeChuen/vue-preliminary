<template>
    <section class="container mt-4">
        <div class="container-fluid text-center">
            <h2>Create New Blog</h2>
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
                                    rows="4" v-model="formState.content"></textarea>
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
                                    v-model="formState.id" />
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
                        to="/blogs"
                        :class="`btn btn-outline-${getOppositeTheme} btn-sm`">Back</RouterLink>
                        <input type="submit" value="Create" class="btn btn-outline-primary btn-sm"
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
import { inject, ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// const theme = inject("theme")
const getOppositeTheme = inject("getOppositeTheme")
const $pages = inject("$pages")
const $bus = inject("$bus")

// ensure that events is initialize. all $on events is initialize
// pages local storage initialize, is not initialize, its null.
$bus.$emit("checkPagesIsInitialized")

const getId = () => {
    let id = Math.floor(1000 + Math.random() * 9000)
    while ($pages.getAllPages().some((data) => data.id === id)) {
        id = Math.floor(1000 + Math.random() * 9000);
    }
    return id
}
const initialForm = {
    name: "",
    content: "",
    link: "",
    id: getId(),
    publish: true
}
const shouldWatch = ref(true) // <-- only watch until user change the link text.

const formState = reactive({ ...initialForm })

watch(() => formState.name, (newName, oldName) => {
    if (formState.link === oldName && shouldWatch.value) {
        formState.link = newName
    } else {
        shouldWatch.value = false
    }
})

// const test = ref("")
// watch(test, (newTest, oldTest) => {
//     console.log("watching ref", newTest, oldTest)
//     formState.name = newTest
// })

const isFormValid = computed(() => {
    return !formState.name || !formState.content || !formState.link || !formState.id ? false : true;
})

const resetForm = () => {
    formState.name = initialForm.name
    formState.content = initialForm.content
    formState.link = initialForm.link
    formState.id = initialForm.id
    formState.publish = initialForm.publish
}


function handleSubmit() {
    if (isFormValid.value) {
        $pages.createPage({
            name: formState.name,
            content: formState.content,
            link: formState.link,
            id: formState.id,
            publish: formState.publish
        })
        resetForm() // <-- reset form 
        $bus.$emit("refreshPages") // <-- rerender pages

        router.push("/blogs")
    } else {
        alert("invalid form")
    }
}


</script>