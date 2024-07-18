<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Vue-Preliminary</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-for="(route, index) in routes" :key="index">
                        <!-- active-class sets a specific class when the link is active. -->
                        <router-link active-class="active" class="nav-link" aria-current="page" :to="route.path">{{
                            route.name }}</router-link>
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
import { inject } from "vue"; // <-- similar to useContext

const theme = inject("theme")
const getOppositeTheme = inject("getOppositeTheme")

function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
}

</script>
