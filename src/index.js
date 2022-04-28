
import "reset.css";
import { createApp, h } from "vue";
import store from "@/store";
import App from "@/app.vue";

createApp({
    render: () => h(App),
}).use(store).mount("#main")