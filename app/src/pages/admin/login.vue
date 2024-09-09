<template>
    <form action="/auth/login/password" method="post">
        <label for="username">
            Nom d'utilisateur
        </label>
        <input type="text" name="username" autocomplete="username webauthn">
        <label for="password">
            Mot de passe
        </label>
        <input type="password" name="password" autocomplete="current-password">
        <input type="submit" value="Se connecter">
    </form>
</template>