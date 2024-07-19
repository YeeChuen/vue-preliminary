<template>
    <section
        :class="`col-8 p-3 pb-0 border border-${getOppositeTheme}-subtle d-flex flex-column justify-content-between`">
        <div>
            <div class="d-flex justify-content-between flex-row mb-3">
                <h4>{{ props.category }}</h4>
                <div style="opacity: 50%;">{{ state.meals.length }} recipes</div>
            </div>
            <table v-if="state.meals.length > 0" class="table" style="table-layout: fixed;">
                <thead>
                    <tr>
                        <th style="width: 5%"></th>
                        <th style="width: 80%">Meal name</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(meal, index) in mealsAtPage" :key="meal.idMeal">
                        <td>{{ index + 1 }}.</td>
                        <td class="text-truncate">
                            <RouterLink :class="`text-decoration-none`" style="text-overflow: ellipsis;"
                            :to="`/meals/${meal.idMeal}`"
                            >{{ meal.strMeal }}
                            </RouterLink>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <ul class="pagination pagination-sm justify-content-end">
            <li class="page-item"><button class="page-link" @click.prevent="handlePrev()">Prev</button></li>
            <li :class="`page-item`" v-for="index in pages" :key="index">
                <button :class="`page-link ${activePage === index - 1 && 'active'}`"
                    @click.prevent="activePage = (index - 1)">{{ index }}</button>
            </li>
            <li class="page-item"><button class="page-link" @click.prevent="handleNext()">Next</button></li>
        </ul>

    </section>
</template>
<script setup>
import { defineProps, inject, reactive, watch, ref, computed } from "vue";
const props = defineProps(["category"])
const getOppositeTheme = inject("getOppositeTheme")

const items = 10
const activePage = ref(0)

const state = reactive({ meals: [] });
async function fetchData() {
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${props.category}`)
        return data.json()
    } catch (error) {
        throw Error(error)
    }
}
watch(() => props.category, () => {
    activePage.value = 0
    fetchData()
        .then((res) => {
            state.meals = [...res.meals]
        })
        .catch((err) => console.log("WARNING", err))
})

const pages = computed(() => {
    return Math.ceil(state.meals.length / items)
})
const mealsAtPage = computed(() => {
    return [...state.meals].slice(activePage.value * items, (activePage.value + 1) * items)
})

const handlePrev = () => {
    if (activePage.value <= 0) {
        return
    }
    activePage.value = activePage.value - 1;
}

const handleNext = () => {
    // console.log(mealsAtPage.value)
    // console.log("total items: ", state.meals.length)
    // console.log("start pages: ", activePage.value * items)
    // console.log("end pages: ", activePage.value + 1 * items)
    // console.log("total pages: ", pages.value)
    // console.log("current pages: ", activePage.value)
    if (activePage.value >= pages.value - 1) {
        return
    }
    activePage.value = activePage.value + 1;

}

</script>