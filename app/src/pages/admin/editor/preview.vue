<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { marked } from 'marked';

const project_data = ref()
const LS_fetch: string | null = localStorage.getItem('cached_project_preview')


project_data.value = JSON.parse(LS_fetch as string)
const output = computed(() => marked(project_data.value.content))


</script>

<template>
    <div class="editor_output" v-html="output"></div>
</template>