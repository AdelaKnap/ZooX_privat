<!-- Startsida med inloggning -->

<template>

    <div class="container text-center mb-3 mt-4">
        <h1 class="text mb-4">Skapa ny användare</h1>
        <p class="text mb-3">Fyll i formuläret nedan för att skapa ett nytt användarkonto.<br>
            Du kan sedan logga in med dina nya inloggningsuppgifter.</p>
    </div>

    <CreateUser />

</template>


<script>
import CreateUser from '@/components/CreateUser.vue';

export default {
    components: { CreateUser }
}

</script>

<style scoped>
@media screen and (max-width: 786px) {
    p {
        font-size: 0.9em;
    }
}
</style>
