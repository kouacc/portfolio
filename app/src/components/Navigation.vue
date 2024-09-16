<!-- eslint-disable vue/multi-word-component-names -->
 <script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import IconBack from './icons/IconBack.vue';

const route = useRoute()
const actualRoute = ref<string>(route.path)
const expectedRoute = "/admin/editor/preview"
const showReturn = ref<Boolean>(false)
console.log(actualRoute.value)

watch(actualRoute, () => {
    if (actualRoute.value === expectedRoute) {
        showReturn.value = true
    } else {
        showReturn.value = false
    }
})

watch(route, () => {
    actualRoute.value = route.path
})

</script>
<template>
    <header class="mt-3 left-1/2 -translate-x-1/2 fixed z-50 rounded-xl font-geist font-medium flex gap-4">
        <RouterLink v-show="showReturn" class="dark:bg-zinc-800 border dark:border-zinc-700 px-4 flex items-center rounded-xl cursor-pointer" to="/admin/editor/new"><IconBack class="rotate-90 size-4 fill-white" /></RouterLink>
        <nav class="flex dark:bg-zinc-800 border dark:border-zinc-700 dark:text-white rounded-xl px-4 py-1 w-auto items-center justify-center">
            <ul class="flex justify-between gap-3 items-center">
                <li class="px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all">
                    <RouterLink activeClass="transition-all border-b-2 border-blue-400" to="/">Home</RouterLink>
                </li>
                <li class="px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all">
                    <RouterLink activeClass="transition-all border-b-2 border-blue-400" to="/projects">Projets</RouterLink>
                </li>
                <li class="px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all">
                    <RouterLink activeClass="transition-all border-b-2 border-blue-400" to="/comps">Compétences</RouterLink>
                </li>
                <li class="px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all">
                    <RouterLink activeClass="transition-all border-b-2 border-blue-400" to="/contact">Contact</RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>