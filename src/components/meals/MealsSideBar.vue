<template>
    <section :class="`col-4 bg-${getOppositeTheme}-subtle p-3`">
        <h4 class="mb-3">The Meals DB</h4>
        <ul class="nav flex-column">
            <!-- <li class="nav-item m-3">Search form</li> -->
            <li class="nav-item" v-for="(category, index) in props.meals" :key="index">
                <button
                    :class="`btn btn-outline-${getOppositeTheme} w-100 text-start border-0 ${activeTab === index && 'active'}`"
                    @click.prevent="handleClick(index)">
                    <span class="text-truncate">{{
                        category.strCategory }}</span>
                </button>
            </li>
        </ul>
    </section>
</template>
<script setup>
import { defineProps, inject, ref } from "vue"
const props = defineProps(["meals"])
const $bus = inject("$bus")
// const theme = inject("theme")
const getOppositeTheme = inject("getOppositeTheme")

const activeTab = ref(0)

function handleClick(index) {
    activeTab.value = index
    $bus.$emit("setMealsCategory", props.meals[index].strCategory)
}
</script>