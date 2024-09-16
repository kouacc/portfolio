<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { marked } from 'marked'
import { debounce } from 'lodash-es'
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';
import IconGear from '@/components/icons/IconGear.vue';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconPreview from '@/components/icons/IconPreview.vue';


gsap.registerPlugin(ScrollTrigger);


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

const showAnim = gsap.from('.navbar', {
  yPercent: 100,
  paused: true,
  duration: 0.2
}).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: "max",
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse()
  }
});
</script>


<template>
    <div class="editor">
    <textarea class="input text-black" :value="input" @input="update"></textarea>
    <div class="editor_output" v-html="output"></div>
    <button>Afficher l'aperçu</button>
  </div>
  <input type="file" name="images" multiple accept="image/png, image/jpeg, image/webp">
  <nav class="navbar flex gap-3 items-center w-fit rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 fixed bottom-0 mb-16 left-1/2 -translate-x-1/2">
    <button class="has-tooltip fill-white transition-all hover:bg-zinc-700 p-2 rounded-lg">
      <IconGear class="size-6" />
      <span class="tooltip transition-all -ml-14 -mt-20 bg-zinc-800 border border-zinc-700 px-2 py-1.5 rounded-lg">Paramètres du projet</span>
    </button>
    <button @click="registerProjectToPreview()" class="has-tooltip fill-white transition-all hover:bg-zinc-700 p-2 rounded-lg">
      <IconPreview class="size-6" />
      <span class="tooltip transition-all -ml-14 -mt-20 bg-zinc-800 border border-zinc-700 px-2 py-1.5 rounded-lg">Prévisualiser</span>
    </button>
    <button class="bg-blue-500 rounded-lg px-2 py-1.5">Créer le projet</button>
  </nav>
</template>
