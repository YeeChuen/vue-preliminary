import { createRouter, createWebHashHistory } from "vue-router";

import Counter from "./components/counter/Counter.vue";
import Home from "./components/Home.vue";
import Todolist from "./components/todolist/Todolist.vue";
import Pages from "./components/pages/Pages.vue";
import PageCreate from "./components/pages/PageCreate.vue";
import PagesView from "./components/pages/PagesView.vue";
import PagesContent from "./components/pages/PageContent.vue";
import PageEdit from "./components/pages/PageEdit.vue";
import NotFound from "./components/shared/NotFound.vue";
import Meals from "./components/meals/Meals.vue";
import MealsContent from "./components/meals/MealsContent.vue";
import MealContent from "./components/meals/MealContent.vue";

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
  {
    path: "/blogs",
    component: Pages,
    children: [
      { path: "", component: PagesView },
      { path: "create", component: PageCreate },
      { path: ":index", component: PagesContent, props: true },
      { path: ":index/edit", component: PageEdit, props: true }
    ],
    name: "Blogs",
    dropdown: true
  },
  { path: "/meals", component: Meals, name: "Meals",
    children: [
      { path: "", component: MealsContent },
      { path: ":id", component: MealContent, props: true },
    ],
  },
  { path: "/:pathMatch(.*)*", component: NotFound}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
