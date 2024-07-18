import { createApp } from "vue";
import App from "./App.vue";

/* style imports*/
import "normalize.css"; // normalize
import "bootstrap/dist/css/bootstrap.css"; // bootstrap
import "bootstrap/dist/js/bootstrap"; // bootstrap
import "bootstrap-icons/font/bootstrap-icons.css"; // bootstrap-icon

/* utils imports */
import $bus from "./utils/events";

/* router import */
import router from "./routes";

/* data import */
import $todos from "./utils/data/todos";

const app = createApp(App);

// add your plugins here
app.use(router); // <-- add router
app.provide("$bus", $bus); // <-- add bus Event handler
app.provide("$todos", $todos); // <-- add todos (example in todolist component)

app.mount("#app");
