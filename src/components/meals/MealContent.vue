<template>
    <section class="container">
        <RouterLink to="/meals" :class="`btn btn-outline-${getOppositeTheme} btn-sm mb-3`">Back</RouterLink>
        <div>
            <div class="d-flex justify-content-between flex-row mb-3 gap-3 align-items-center">
                <div class="d-flex justify-content-center align-items-center mb-3  w-50">
                    <img class="img-fluid" style="height: 40vh; width: 50vw; object-fit: cover;"
                        :src="state.meal.strMealThumb" :alt="`meal image for ${state.meal.strMeal}`" />
                </div>

                <div class="d-flex flex-column align-items-center w-50">
                    <h3>{{ state.meal.strMeal }}</h3>
                    <div>Category: {{ state.meal.strCategory }}</div>
                    <div>Cusine: {{ `${state.meal.strArea ? state.meal.strArea : "Unknown"}` }}</div>
                    <div>Video: <a v-if="state.meal.strYoutube" :class="`link-${getOppositeTheme}`"
                            :href="state.meal.strYoutube" target="_blank">Youtube</a>
                        <span v-else>None</span>
                    </div>
                    <div>Tags: {{ `${state.meal.strTags ? state.meal.strTags : "No tags"}` }}</div>
                </div>
            </div>
            <div>
                Ingredients:
                <div>
                    <ul>
                        <li v-for="(data, index) in ingredients" :key="index">
                            {{ data.amount }} {{ data.ingredient }}
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                Instructions:
                <div>
                    <ol>
                        <li v-for="(step, index) in instructions" :key="index">
                            {{ step }}
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { defineProps, inject, reactive, computed } from "vue"

const props = defineProps(["id"])
const getOppositeTheme = inject("getOppositeTheme")
const state = reactive({ meal: [] });


async function fetchData() {
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.id}`)
        return data.json()
    } catch (error) {
        throw Error(error)
    }
}

const ingredients = computed(() => {
    if (state.meal) {
        const ingredientKey = "strIngredient";
        const amountKey = "strMeasure";
        const arr = []
        for (let i = 1; i <= 20; i++) {
            if (state.meal[amountKey + i.toString()] && state.meal[ingredientKey + i.toString()]) {
                arr.push({ amount: state.meal[amountKey + i.toString()], ingredient: state.meal[ingredientKey + i.toString()] })
            }
        }
        return arr
    }
    return []
})

const instructions = computed(() => {
    if (state.meal.strInstructions) {
        let temp = state.meal.strInstructions.replaceAll("\r", "").replaceAll("\t", "")
        const arr = temp.split("\n").filter((e) => e !== "" && e.length >= 4)
        return arr
    }
    return []
})

fetchData()
    .then((res) => {
        state.meal = [...res.meals][0]
    })
    .catch((err) => console.log("WARNING", err))

</script>