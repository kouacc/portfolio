<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLogs } from '@/utils';
import BackBtn from '@/components/BackBtn.vue';


const logs = ref()

onMounted(async () => {
    logs.value = await getLogs()
    console.log(logs.value)
})
</script>

<template>
    <div class="container">
        <BackBtn text="Retour" />
        <h1>Logs Express</h1>
        <div v-if="logs" v-html="logs"></div>
    </div>
</template>