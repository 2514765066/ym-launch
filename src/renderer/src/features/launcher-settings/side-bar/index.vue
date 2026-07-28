<template>
  <SidebarProvider>
    <Sidebar collapsible="none" class="size-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>设置</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in router" :key="item.id">
                <SidebarMenuButton
                  as-child
                  :is-active="selectedRouteID == item.id"
                >
                  <a href="#" @click="handleClick(item.id)">
                    <component :is="item.icon" />

                    <span>{{ item.name }}</span>

                    <span class="ml-auto">{{ item.description }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </SidebarProvider>
</template>

<script setup lang="ts">
import router, { selectedRouteID } from '../router.js';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const handleClick = (id: string) => {
  selectedRouteID.value = id;
};
</script>

<style scoped lang="scss"></style>
