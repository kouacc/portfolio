<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <h1>Accès Admin</h1>
    <form action="/auth/login/password" method="post" enctype="application/x-www-form-urlencoded" class="bg-blue-300 p-4">
        <div class="flex flex-col">
            <label for="username">
                Nom d'utilisateur
            </label>
            <input type="text" name="username" autocomplete="username webauthn">
        </div>
        <div class="flex flex-col">
            <label for="password">
                Mot de passe
            </label>
            <input type="password" name="password" autocomplete="current-password">
        </div>
        <input type="submit" value="Se connecter" class="rounded-lg bg-blue-500 px-3 py-2 ">
    </form>
</template>