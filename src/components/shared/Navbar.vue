<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow ">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/" >
                <img src="./vue-preliminary-logo.png" width="30" height="30" class="d-inline-block align-top rounded" alt="">
    
                Vue-Preliminary</router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown" v-for="(route, index) in routes" :key="index">
                        <!-- active-class sets a specific class when the link is active. -->
                        <router-link v-if="!route.dropdown && route.name" active-class="active" class="nav-link" aria-current="page"
                            :to="route.path">{{
                                route.name }}</router-link>

                        <div v-if="route.dropdown && route.name">
                            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {{ route.name }}
                            </a>
                            <ul class="dropdown-menu">
                                <li><router-link class="dropdown-item" :to="route.path">{{ route.name }}</router-link>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li v-for="(published, index) in state.pages" :key="index">
                                    <router-link class="dropdown-item"
                                        :to="`/blogs/${published.id}`">{{ published.name }}</router-link>
                                </li>

                                <li v-if="state.pages.length === 0">
                                    <div class="dropdown-item disabled">No Blogs</div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <form class="d-flex flex-row justify-content-end" role="toggle mode">
                    <div class="form-check form-switch">
                        <button :class="`btn btn-outline-${getOppositeTheme}`" @click.prevent="toggleTheme">
                            <i v-if="theme === 'light'" class="bi bi-sun"></i>
                            <i v-if="theme === 'dark'" class="bi bi-moon"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { routes } from "../../routes.js";
import { inject, reactive } from "vue"; // <-- similar to useContext

const theme = inject("theme")
const getOppositeTheme = inject("getOppositeTheme")
const $bus = inject("$bus")

function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
}

const $pages = inject("$pages")
const state = reactive({ pages: !$pages.getAllPublishedPages() ? [] : [...$pages.getAllPublishedPages()] })
$bus.$on("refreshPages", () => {
    state.pages = [...$pages.getAllPublishedPages()];
})

</script>
