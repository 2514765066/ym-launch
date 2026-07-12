import { CircleAlertIcon, CircleArrowUpIcon } from "lucide-vue-next";
import { Component } from "vue";
import Update from "./view/update.vue";
import About from "./view/about.vue";

export interface Route {
  id: string;
  name: string;
  icon: Component;
  component: Component;
}

const router: Route[] = [
  {
    id: "update",
    name: "更新",
    icon: CircleArrowUpIcon,
    component: Update,
  },
  {
    id: "about",
    name: "关于",
    icon: CircleAlertIcon,
    component: About,
  },
];

//当前选中的路由的id
export const selectedRouteID = ref(router[0].id);

//选中的路由
export const selectedRoute = computed(() => {
  return router.find(r => r.id == selectedRouteID.value);
});

export default router;
