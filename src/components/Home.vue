<template>
    <section class="container mt-4">
        <h1>Vue-Preliminary</h1>
        <p>Vue-preliminary is an exercise project aimed at learning Vue.js. With a solid foundation in HTML, CSS,
            JavaScript, and React, I am now transitioning to Vue.js to broaden my web development skills. This project
            serves as a practical application of my existing knowledge, allowing me to explore the nuances and
            capabilities of Vue.js.</p>
        <p>The project includes multiple custom components and pages such as basic counter, todolist, pages and much
            more. Each designed to leverage specific aspects of web
            development and to learn Vue.js. This includes and not limited to:
        <ul>
            <li>Options API vs Composition API</li>
            <li>Vue state management</li>
            <li>Data binding(forms, html props, etc)</li>
            <li>Vue router(Routing)</li>
            <li>Vue event handling</li>
            <li>Pagination</li>
            <li>Vue custom components</li>
        </ul>
        </p>
        <p>Through Vue-preliminary, I aim to connect my existing knowledge with Vue.js, thereby enhancing my ability to
            build robust and scalable web applications. This project not only helps in understanding the core concepts
            of Vue.js but also in applying advanced techniques such as custom directives, mixins, and Vue's lifecycle
            hooks to create a comprehensive and interactive web experience.</p>

        <p>Note: Vue-preliminary is not optimize for mobile view, it is meant for desktop only.</p>
        <a :class="`link-${getOppositeTheme}`" href="https://github.com/YeeChuen/vue-preliminary" target="_blank" >Github Repo</a>
    </section>
</template>

<script setup>
import {inject} from "vue"
const getOppositeTheme = inject("getOppositeTheme")
</script>