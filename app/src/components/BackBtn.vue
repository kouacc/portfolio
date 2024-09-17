<script setup lang="ts">
import IconBack from './icons/IconBack.vue';

const props = defineProps<{
  text: string
  icon?: string | object | null
}>()
</script>

<template>
    <RouterLink to="#" @click.prevent="$router.go(-1)" class="inline-flex items-center gap-5 rounded-xl px-4 py-1.5 dark:bg-zinc-800 border dark:border-zinc-700">
        <component v-if="props.icon" :is="props.icon" class="size-5 dark:fill-white"/>
        <IconBack class="size-5 rotate-90 dark:fill-white" v-else />
        {{ text }}
    </RouterLink>
</template>