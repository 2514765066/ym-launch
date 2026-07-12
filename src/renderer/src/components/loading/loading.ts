import { render } from "vue";
import Loading from "./index.vue";

export const visible = ref(false);

let isCreate = false;

export const service = () => {
  visible.value = true;

  const close = () => {
    visible.value = false;
  };

  //有缓存
  if (isCreate) {
    return close;
  }

  isCreate = true;

  const container = document.createElement("div");

  document.body.appendChild(container);

  const vnode = h(Loading);

  render(vnode, container);

  return close;
};
