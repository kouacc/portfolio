<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { marked } from 'marked'
import { debounce } from 'lodash-es'
import { fetchProject } from '@/utils';

const id = useRoute('/editor/[id]')
const project = ref()

onMounted(async () => {
    project.value = fetchProject(id)
})


const input = ref('# Nouveau projet')
const output = computed(() => marked(input.value))

const update = debounce((e) => {
  input.value = e.target.value
}, 100)
</script>


<template>
    <div class="editor">
    <textarea class="input" :value="input" @input="update"></textarea>
    <div class="editor_output" v-html="output"></div>
  </div>
</template>
