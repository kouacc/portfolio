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

const params_popup = ref(false)
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

const project_imgs = ref<string[]>([])

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const files = Array.from(target.files);
    project_imgs.value = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          project_imgs.value.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

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
    await localStorage.setItem('cached_project_imgs', JSON.stringify(project_imgs.value))
    router.replace('/admin/editor/preview')
}

onMounted(() => {
    if (localStorage.getItem('cached_project_preview')) {
        console.log(JSON.parse(localStorage.getItem('cached_project_preview') as string))
        project.value = JSON.parse(localStorage.getItem('cached_project_preview') as string)
        input.value = project.value.content
    }
    if (localStorage.getItem('cached_project_imgs')) {
      project_imgs.value = JSON.parse(localStorage.getItem('cached_project_imgs') as string)
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
    <div class="flex h-screen gap-10 flex-col md:flex-row p-4 md:p-0">
    <textarea class="input w-full h-1/2 md:w-1/2 md:h-screen dark:bg-zinc-800 dark:text-white p-5 rounded-xl md:rounded-tr-xl" :value="input" @input="update"></textarea>
    <div class="editor_output w-full h-1/2 md:w-1/2 md:h-screen" v-html="output"></div>
  </div>
  <nav class="navbar flex gap-3 items-center w-fit rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 fixed bottom-0 mb-16 left-1/2 -translate-x-1/2">
    <button @click="params_popup = ! params_popup" class="has-tooltip fill-white transition-all hover:bg-zinc-700 p-2 rounded-lg">
      <IconGear class="size-5" />
      <span class="tooltip transition-all -ml-14 -mt-20 bg-zinc-800 border border-zinc-700 px-2 py-1.5 rounded-lg">Paramètres du projet</span>
    </button>
    <div v-show="params_popup" class="w-screen absolute bottom-16 p-4 rounded-xl bg-zinc-800 border border-zinc-700 flex flex-col items-start justify-start">
      <h1 class="text-2xl">Paramètres du projet</h1>
      <div class="space-y-3">
        <div class="flex flex-col gap-2">
          <label for="title">Titre</label>
          <input class="bg-zinc-700 px-2.5 py-1 rounded-lg" type="text" v-model="project.title">
        </div>
        <div class="flex flex-col gap-2">
          <label for="title">Année de réalisation</label>
          <input class="bg-zinc-700 px-2.5 py-1 rounded-lg" type="date" v-model="project.year">
        </div>
        <div class="flex flex-col gap-2">
          <label for="title">Images</label>
          <input class="file:bg-zinc-700 file:border-0 file:p-0 file:text-white file:px-2.5 file:py-1 file:rounded-lg" type="file" multiple accept="image/png, image/jpeg, image/webp" @change="onFileChange">
        </div>
        <div>
          <h2>Aperçu des images</h2>
          <div class="flex gap-3 items-center">
            <img v-for="(img, index) in project_imgs" :key="index" :src="img">
          </div>
        </div>
      </div>
    </div>
    <button @click="registerProjectToPreview()" class="has-tooltip fill-white transition-all hover:bg-zinc-700 p-2 rounded-lg">
      <IconPreview class="size-5" />
      <span class="tooltip transition-all -ml-14 -mt-20 bg-zinc-800 border border-zinc-700 px-2 py-1.5 rounded-lg">Prévisualiser</span>
    </button>
    <button class="bg-blue-500 rounded-lg px-2 py-1.5 text-sm">Créer le projet</button>
  </nav>
  
</template>
