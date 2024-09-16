<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { checkToken } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter()

onMounted(async () => {
    const isAllowed = ref(await checkToken())

    if (isAllowed.value === false) {
        router.replace("/admin/login")
    }
})
</script>

<template>
    <h1>Bienvenue</h1>
    <RouterLink to="/admin/editor/new" class="bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-xl">Créer un projet</RouterLink>
</template>