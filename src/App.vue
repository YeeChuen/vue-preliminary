<template>
  <section :data-bs-theme="theme" :class="`bg-${theme} text-${getTextColor} vh-100 overflow-y-scroll`">
    <Navbar></Navbar>
    <RouterView :key="$route.fullPath"></RouterView> <!-- add keybinding for force rerender when params url changes -->
    <!-- here is the displaying the router -->
  </section>
</template>

<script setup>
//<-- setup prop keyword for composition API
import Navbar from "./components/shared/Navbar.vue";
import { ref, provide, computed } from "vue";

const theme = ref("light")

const getTextColor = computed(() => {
  return theme.value === "light" ? "dark" : "white" 
})
const getOppositeTheme = computed(() => {
  return theme.value === "light" ? "dark" : "light" 
})


provide('theme', theme) // <-- similar to createContext, then context.Provider
provide('getOppositeTheme', getOppositeTheme) // <-- similar to createContext, then context.Provider

// below is Options API (unused)
// export default {
//   setup() { //<-- setup function for composition API
//     const count = ref(0)

//     function increment() {
//       // .value is needed in JavaScript
//       count.value++
//     }

//     // don't forget to expose the function as well.
//     return {
//       count,
//       increment
//     }
//   },
//   components: {
//     /* components props defines imported component that will be used in this component */
//   }
// }
</script>
