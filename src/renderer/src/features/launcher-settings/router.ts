import {
  CircleAlertIcon,
  CircleArrowUpIcon,
  LayoutGrid,
  PaletteIcon,
} from '@lucide/vue';
import { Component } from 'vue';
import General from './view/general.vue';
import Appearance from './view/appearance.vue';
import Update from './view/update.vue';
import About from './view/about.vue';
import { appVersion } from '@shared/app-info';

export interface Route {
  id: string;
  name: string;
  description?: string;
  icon: Component;
  component: Component;
}

const router: Route[] = [
  {
    id: 'general',
    name: '常规',
    icon: LayoutGrid,
    component: General,
  },
  {
    id: 'appearance',
    name: '外观',
    icon: PaletteIcon,
    component: Appearance,
  },
  {
    id: 'update',
    name: '更新',
    icon: CircleArrowUpIcon,
    component: Update,
  },
  {
    id: 'about',
    name: '关于',
    description: `v${appVersion}`,
    icon: CircleAlertIcon,
    component: About,
  },
];

//当前选中的路由的id
export const selectedRouteID = ref(router[0].id);

//选中的路由
export const selectedRoute = computed(() => {
  return router.find((r) => r.id == selectedRouteID.value);
});

export default router;
