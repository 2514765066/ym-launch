<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <Transition name="fade" appear>
        <section class="size-full flex-center">
          <div
            class="w-1/2 relative flex-center aspect-square hover:scale-110 transition-transform cursor-pointer"
            @click="startup"
          >
            <img :src="src" class="size-[80%] rounded-2xl" />

            <span
              class="absolute bottom-0 translate-y-[calc(100%+8px)] text-center text-xs"
            >
              {{ data.name }}
            </span>
          </div>
        </section>
      </Transition>
    </ContextMenuTrigger>

    <ContextMenuContent class="min-w-60">
      <ContextMenuItem>
        <SquarePen class="size-4" />

        <span>重命名</span>
      </ContextMenuItem>

      <ContextMenuItem @select="showInFolder(data.path)">
        <FolderOpen class="size-4" />

        <span>打开文件所在位置</span>
      </ContextMenuItem>

      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <CornerUpRight class="size-4" />

          <span>移动</span>
        </ContextMenuSubTrigger>

        <ContextMenuSubContent>
          <ContextMenuItem>
            <span>桌面</span>
          </ContextMenuItem>

          <ContextMenuItem>
            <span>文档</span>
          </ContextMenuItem>

          <ContextMenuItem>
            <span>下载</span>
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSeparator />

      <ContextMenuItem variant="destructive" @select="removeApps(data.id)">
        <Trash2 class="size-4" />

        <span>删除</span>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>

<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { CornerUpRight, FolderOpen, SquarePen, Trash2 } from "lucide-vue-next";
import { App, useAppsStore } from "@/stores/useAppsStore";

const { removeApps } = useAppsStore();

const props = defineProps<{
  data: App;
}>();

const src = ref("");

//启动应用
const startup = () => {
  api.startApp(props.data.path);
};

//打开文件所在位置
const showInFolder = (path: string) => {
  api.showItemInFolder(path);
};

onMounted(async () => {
  src.value = await api.getIcon(props.data.path);
});
</script>

<style scoped lang="scss">
section {
  > div {
    > img {
      filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.3));
    }

    > span {
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    }
  }
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease !important;
  transform-origin: center center;
}

.fade-enter-to,
.fade-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
