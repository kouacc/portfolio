<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="mt-3 left-1/2 -translate-x-1/2 fixed z-50 bg-zinc-900 rounded-xl fon-geist font-medium">
        <nav class="flex border dark:border-zinc-800 dark:text-white rounded-xl px-4 py-1 w-auto items-center justify-center">
            <ul class="flex justify-between gap-3 items-center">
                <li class="px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all">
                    <RouterLink activeClass="transition-all border-b-2 border-blue-400" to="/">Home</RouterLink>
                </li>
                <li class="px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all">
                    <RouterLink activeClass="transition-all border-b-2 border-blue-400" to="/projects">Projets</RouterLink>
                </li>
                <li class="px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all">
                    <RouterLink activeClass="transition-all border-b-2 border-blue-400" to="/comps">Compétences</RouterLink>
                </li>
                <li class="px-3 py-1.5 hover:bg-zinc-800 rounded-lg transition-all">
                    <RouterLink activeClass="transition-all border-b-2 border-blue-400" to="/contact">Contact</RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>