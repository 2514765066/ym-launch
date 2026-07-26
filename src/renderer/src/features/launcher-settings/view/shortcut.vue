<template>
  <Container>
    <div class="pt-4 flex flex-col gap-8">
      <ItemGroup>
        <p class="py-3 px-4">快捷键</p>

        <ItemSeparator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>快速启动</ItemTitle>

            <ItemDescription>配置快速启动快捷键</ItemDescription>
          </ItemContent>

          <ItemActions>
            <Shortcut v-model="config.startShortcut" />
          </ItemActions>
        </Item>

        <Item size="sm">
          <ItemContent>
            <ItemTitle>关闭</ItemTitle>

            <ItemDescription>配置隐藏启动器的快捷键</ItemDescription>
          </ItemContent>

          <ItemActions>
            <Shortcut v-model="config.hiddenShortcut" />
          </ItemActions>
        </Item>

        <Item size="sm">
          <ItemContent>
            <ItemTitle>上一页</ItemTitle>

            <ItemDescription>配置切换到上一页的快捷键</ItemDescription>
          </ItemContent>

          <ItemActions>
            <Shortcut v-model="config.prePageShortcut" />
          </ItemActions>
        </Item>

        <Item size="sm">
          <ItemContent>
            <ItemTitle>下一页</ItemTitle>

            <ItemDescription>配置切换到下一页的快捷键</ItemDescription>
          </ItemContent>

          <ItemActions>
            <Shortcut v-model="config.nextPageShortcut" />
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/container/index.vue';
import Shortcut from '@/components/shortcut.vue';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item';
import { useSettingStore } from '@/stores/setting';

const { config } = storeToRefs(useSettingStore());
</script>
