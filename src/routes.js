import { createRouter, createWebHashHistory } from "vue-router";

import Counter from "./components/counter/Counter.vue";
import Home from "./components/Home.vue";
import Todolist from "./components/todolist/Todolist.vue";

export const routes = [
  /* 
        define your routes here,
        basic route:
            { path: "", component: ImportedComponent }

        url params route:
            ":" indicate url params
            "?" indicate optional url params
            "props" indicate if we want the params to be passed as props
              true: access in "props: ['index']" in Options API
              false: access using $route.params.index
            { path: "/:index?", component: ImportedComponent, props: <boolean_value> }

        nested route:
            { path: "/pages", component: ImportedComponent 
              children: [
                { path: "create", component: ImportedComponent } <-- .com/pages/create
              ] 
            }
    */
  { path: "/", component: Home, name: "Home" },
  { path: "/counter", component: Counter, name: "Counter" },
  { path: "/todolist", component: Todolist, name: "Todolist" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
