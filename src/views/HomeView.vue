<!-- Startsida med inloggning -->

<template>

    <div class="container text-center mb-3 mt-4">
        <h1 class="text mb-3">Startsida</h1>
        <h2 class="text mb-4">ZooX produkthantering för personal</h2>
        <p class="text mb-4">Välkommen till ZooX:s produkthantering för personal.<br>
            Logga in, eller skapa en ny användare om du ännu inte
            har något användarkonto.</p>
        <h3 class="text mb-2 mt-5">Logga in:</h3>
    </div>

    <Login />

</template>


<script>
import Login from '@/components/Login.vue';
export default {
    components: { Login }
}

</script>

<style scoped>

h2 {
    font-size: 1.3em;
}

h3 {
    font-size: 1.2em;
}

@media screen and (max-width: 786px) {
    p {
        font-size: 0.9em;
    }
}
</style>
