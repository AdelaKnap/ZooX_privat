<template>
    <Header />
    <main>
        <RouterView />
    </main>
    <Footer />
</template>

<script>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
    components: {
        Header,
        Footer,
        RouterView
    }
}
</script>


<style scoped>
main {
    margin: 0 auto;
    padding: 2% 1% 5% 1%;
    max-width: 1400px;
    display: flex;
    flex-direction: column; 
    min-height: 90vh; 
}
</style>
