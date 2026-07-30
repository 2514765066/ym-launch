<template>
  <Container view-class="py-8 flex flex-col gap-8">
    <ItemGroup>
      <p class="py-3 px-4">桌面布局</p>

      <ItemSeparator />

      <Item size="sm">
        <ItemContent>
          <ItemTitle>桌面行数</ItemTitle>

          <ItemDescription>设置桌面的行数</ItemDescription>
        </ItemContent>

        <ItemActions>
          <NumberField :min="1" :max="10" v-model="config.rowCount">
            <NumberFieldContent>
              <NumberFieldDecrement />

              <NumberFieldInput />

              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </ItemActions>
      </Item>

      <Item size="sm">
        <ItemContent>
          <ItemTitle>桌面列数</ItemTitle>

          <ItemDescription>设置桌面的列数</ItemDescription>
        </ItemContent>

        <ItemActions>
          <NumberField :min="1" :max="10" v-model="config.colCount">
            <NumberFieldContent>
              <NumberFieldDecrement />

              <NumberFieldInput />

              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </ItemActions>
      </Item>
    </ItemGroup>

    <ItemGroup>
      <p class="py-3 px-4">图标</p>

      <ItemSeparator />

      <Item size="sm">
        <ItemContent>
          <ItemTitle>图标名称</ItemTitle>

          <ItemDescription>设置图标名称的文字大小</ItemDescription>
        </ItemContent>

        <ItemActions>
          <Select v-model="config.iconTitleSize">
            <SelectTrigger class="w-28">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem
                v-for="(label, value) in iconTitleSizeMap"
                :key="value"
                :value="value"
              >
                {{ label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </ItemActions>
      </Item>

      <Item size="sm">
        <ItemContent>
          <ItemTitle>图标尺寸</ItemTitle>

          <ItemDescription>设置桌面的图标大小</ItemDescription>
        </ItemContent>

        <ItemActions class="w-45">
          <span>{{ config.iconZoom }}</span>

          <Slider
            class="w-full"
            :min="10"
            :max="90"
            :model-value="[config.iconZoom]"
            @update:model-value="(res) => (config.iconZoom = res![0])"
          />
        </ItemActions>
      </Item>
    </ItemGroup>

    <ItemGroup>
      <p class="py-3 px-4">背景</p>

      <ItemSeparator />

      <Item size="sm">
        <ItemContent>
          <ItemTitle>高斯模糊</ItemTitle>

          <ItemDescription>桌面背景的高斯模糊程度</ItemDescription>
        </ItemContent>

        <ItemActions class="w-45">
          <span>
            {{ config.blur }}
          </span>

          <Slider
            class="w-full"
            :model-value="[config.blur]"
            @update:model-value="(res) => (config.blur = res![0])"
          />
        </ItemActions>
      </Item>

      <Item size="sm">
        <ItemContent>
          <ItemTitle>遮罩</ItemTitle>

          <ItemDescription>桌面背景的遮罩程度</ItemDescription>
        </ItemContent>

        <ItemActions class="w-45">
          <span>
            {{ config.mask }}
          </span>

          <Slider
            class="w-full"
            :model-value="[config.mask]"
            @update:model-value="(res) => (config.mask = res![0])"
          />
        </ItemActions>
      </Item>
    </ItemGroup>
  </Container>
</template>

<script setup lang="ts">
import { Slider } from '@/components/ui/slider';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemSeparator,
  ItemTitle,
  ItemGroup,
  ItemActions,
} from '@/components/ui/item';
import Container from '@/components/container/index.vue';
import { iconTitleSizeMap } from '@/map';
import { useSettingStore } from '@/stores/setting';

const { config } = storeToRefs(useSettingStore());
</script>

<style scoped lang="scss"></style>
