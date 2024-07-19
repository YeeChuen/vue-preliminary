<template>
    <section class="container mb-5">
        <div class="row">
            <MealsSideBar :meals="state.meals"></MealsSideBar>
            <MealsTable :category="category"></MealsTable>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import MealsSideBar from "./MealsSideBar.vue"
import MealsTable from "./MealsTable"

const state = reactive({ meals: [] });
// const getOppositeTheme = inject("getOppositeTheme");
const $bus = inject("$bus");
const category = ref("");
$bus.$on("setMealsCategory", (newCategory) => {
    category.value = newCategory
})

async function fetchData() {
    try {
        const data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        return data.json()
    } catch (error) {
        throw Error(error)
    }
}
fetchData()
    .then((res) => {
        state.meals = [...res.meals]
        category.value = res.meals[0].strCategory
    })
    .catch((err) => console.log(err))
</script>