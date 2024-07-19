<template>
    <section :class="`col-4 bg-${getOppositeTheme}-subtle p-3`">
        <h4 class="mb-3">The Meals DB</h4>
        <ul class="nav flex-column">
            <li class="nav-item mb-3">
                <form>
                    <div class="input-group">
                        <input type="search" class="form-control " id="TheMealDB search box"
                            placeholder="Search meal by name" v-model="searchParam">
                        <span class="input-group-append">
                            <button :class="`btn btn-outline-${getOppositeTheme} border rounded-top  ms-n3`"
                                type="submit" @click.prevent="handleSearch()">
                                <i class="bi bi-search"></i>
                            </button>
                        </span>
                    </div>
                </form>
            </li>
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

const searchParam = ref("")

const activeTab = ref(0)

function handleClick(index) {
    activeTab.value = index
    $bus.$emit("setMealsCategory", props.meals[index].strCategory)
}

function handleSearch() {
    activeTab.value = -1
    $bus.$emit("setMealsCategory", `searchInput-${searchParam.value}`)
}
</script>