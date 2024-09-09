<script setup lang="ts">
// TODO: verif si l'utilisateur existe dans la database
// TODO: check si le token existe, rediriger si non


import { checkToken } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

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