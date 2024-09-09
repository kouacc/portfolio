<template>
    <form action="/auth/login/password" method="post">
        <label for="username">
            Nom d'utilisateur
        </label>
        <input type="text" name="username">
        <label for="password">
            Mot de passe
        </label>
        <input type="password" name="password" id="">
        <input type="submit" value="Se connecter">
    </form>
</template>