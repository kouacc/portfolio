<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { checkToken } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(async () => {
    const isAllowed = ref(await checkToken())

    if (isAllowed.value === false) {
        router.replace("/admin/login")
    }
})
</script>

<template>
    <h1>T'es dedans mec</h1>
</template>