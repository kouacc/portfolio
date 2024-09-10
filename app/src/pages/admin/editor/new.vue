<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { marked } from 'marked'
import { debounce } from 'lodash-es'
import { useRouter } from 'vue-router';

const router = useRouter()

const input = ref('# Nouveau projet')
const output = computed(() => marked(input.value))
const isSaved = ref(true)

const update = debounce((e) => {
  input.value = e.target.value
}, 100)

const project = ref({
    title: '',
    content: input.value,
    year: '',
    status: '',
    techs: [],
})

watch(input, () => {
    isSaved.value = false
    project.value.content = input.value
    setTimeout(() => {
      isSaved.value = true
      localStorage.setItem('cached_project_preview', JSON.stringify(project.value))
    }, 2000)
})

async function registerProjectToPreview() {
    await localStorage.setItem('cached_project_preview', JSON.stringify(project.value))
    router.replace('/admin/editor/preview')
}

onMounted(() => {
    if (localStorage.getItem('cached_project_preview')) {
        console.log(JSON.parse(localStorage.getItem('cached_project_preview') as string))
        project.value = JSON.parse(localStorage.getItem('cached_project_preview') as string)
        input.value = project.value.content
    }
})
</script>


<template>
    <div class="editor">
    <textarea class="input" :value="input" @input="update"></textarea>
    <div class="editor_output" v-html="output"></div>
    <button @click="registerProjectToPreview()">Afficher l'aperçu</button>
  </div>
</template>
