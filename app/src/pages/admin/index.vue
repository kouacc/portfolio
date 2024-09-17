<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { checkToken, fetchAllProjets, deleteProject } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

const router = useRouter()
const projects = ref([])

onMounted(async () => {
    const isAllowed = ref(await checkToken())

    if (isAllowed.value === false) {
        router.replace("/admin/login")
    }

    projects.value = await fetchAllProjets()
})
</script>

<template>
    <div class="container">
        <h1>Bienvenue</h1>
        <RouterLink to="/admin/editor/new" class="bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-xl">Créer un projet</RouterLink>
        <RouterLink to="/admin/logs" class="bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-xl">Consulter les logs serveur</RouterLink>
        <section>
            <h2>Gérer les projets</h2>
            <ul>
                <li v-for="project in projects" :key="project" class="px-4 py-1.5 dark:bg-zinc-800 border dark:border-zinc-700 rounded">
                    <button @click="deleteProject(project.id)">Supprimer</button>
                </li>
            </ul>
        </section>
    </div>
</template>