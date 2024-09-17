<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { marked } from 'marked';

const LS_prj_fetch: string | null = localStorage.getItem('cached_project_preview')
const LS_img_fetch: string | null = localStorage.getItem('cached_project_imgs')

const project_data = ref(JSON.parse(LS_prj_fetch as string))
const project_imgs = ref(JSON.parse(LS_img_fetch as string))

const output = computed(() => marked(project_data.value.content))

const timestamp = new Date()
const yyyy = timestamp.getFullYear()
let mm = timestamp.getMonth()
let dd = timestamp.getDay()

if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}

const formattedToday = dd + '/' + mm + '/' + yyyy;
</script>

<template>
    <div class="container">
        <section class="flex justify-between">
            <h1 v-if="project_data">{{ project_data.title }}</h1>
            <div class="flex flex-col gap-3">
                <span class="text-base">Ajouté le {{ formattedToday }}</span>
                <span class="text-base">Modifié le {{ formattedToday }}</span>
            </div>
        </section>

        <div class="flex gap-10">
            <img class="w-64 h-auto object-contain" v-for="(img, index) in project_imgs" :src="img" :key="index">
        </div>
        <div class="editor_output" v-html="output"></div>
    </div>
</template>