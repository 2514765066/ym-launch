<template>
  <Container>
    <div class="pt-8 flex flex-col gap-8">
      <ItemGroup>
        <p class="py-3 px-4">常规</p>

        <ItemSeparator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>开机自启动</ItemTitle>

            <ItemDescription>开机后自动启动应用</ItemDescription>
          </ItemContent>

          <ItemActions>
            <Switch v-model="config.openAtLogin" />
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { Switch } from '@/components/ui/switch';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item';
import Container from '@/components/container/index.vue';
import { useSettingStore } from '@/stores/setting';

const { config } = storeToRefs(useSettingStore());
</script>
