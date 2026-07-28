<template>
  <Container view-class="py-8 flex flex-col gap-8">
    <ItemGroup>
      <p class="py-3 px-4">启动角</p>

      <ItemSeparator />

      <Item size="sm">
        <ItemContent>
          <ItemTitle>启动角</ItemTitle>

          <ItemDescription> 开启/禁用启动角 </ItemDescription>
        </ItemContent>

        <ItemActions>
          <Switch
            :model-value="!config.hotCornerDisabled"
            @update:model-value="(value) => (config.hotCornerDisabled = !value)"
          />
        </ItemActions>
      </Item>

      <Item size="sm">
        <ItemContent>
          <ItemTitle>启动角位置</ItemTitle>

          <ItemDescription>设置启动角的位置</ItemDescription>
        </ItemContent>

        <ItemActions>
          <Select v-model="config.hotCornerPosition">
            <SelectTrigger class="w-28">
              <SelectValue
                :placeholder="hotCornerMap[config.hotCornerPosition]"
              />
            </SelectTrigger>

            <SelectContent>
              <SelectItem
                v-for="(label, position) in hotCornerMap"
                :key="position"
                :value="position"
              >
                {{ label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </ItemActions>
      </Item>
    </ItemGroup>
  </Container>
</template>

<script setup lang="ts">
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { hotCornerMap } from '@/map';
import { useSettingStore } from '@/stores/setting';

const { config } = storeToRefs(useSettingStore());
</script>
