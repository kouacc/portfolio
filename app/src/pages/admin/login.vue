<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <h1>Accès Admin</h1>
        <form action="/auth/login/password" method="post" enctype="application/x-www-form-urlencoded" class="flex flex-col gap-4">
            <div class="flex flex-col gap-2.5">
                <label for="username">
                    Nom d'utilisateur
                </label>
                <input class="bg-zinc-800 border-2 border-zinc-700 rounded-xl p-2" type="text" name="username" autocomplete="username webauthn">
            </div>
            <div class="flex flex-col gap-2.5">
                <label for="password">
                    Mot de passe
                </label>
                <input class="bg-zinc-800 border-2 border-zinc-700 rounded-xl p-2" type="password" name="password" autocomplete="current-password">
            </div>
            <input type="submit" value="Se connecter" class="rounded-lg bg-blue-500 px-3 py-2 place-self-end">
        </form>
    </div>
</template>