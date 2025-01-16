<!-- Navigering och banner i headern -->

<template>
    <header>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container-fluid">
                <!-- Logo + Text -->
                <router-link to="/" class="navbar-brand d-flex align-items-center">
                    <img src="@/assets/images/default.jpg" alt="Logo" class="me-2 img-fluid w-25 rounded">
                    <span>ZooX</span>
                </router-link>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">Startsida</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/products" class="nav-link">Produkter</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
    components: {
        RouterLink
    }
}
</script>


<style scoped>
.navbar .nav-link:hover {
    font-weight: bold;
    color: white;
}

.router-link-active {
    color: white;
}

</style>