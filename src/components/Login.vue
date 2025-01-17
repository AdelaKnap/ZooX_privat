<template>

    <div class="container d-flex justify-content-center">

        <form @submit.prevent="loginUser" class="w-100 mb-5 bg-light p-4" style="max-width: 500px;">

            <div class="mb-3">
                <label for="username" class="form-label">Användarnamn:</label>
                <input v-model="username" type="text" class="form-control" id="username"
                    placeholder="Ange användarnamn">
            </div>
            <div class="mb-4">
                <label for="password" class="form-label">Lösenord:</label>
                <input v-model="password" type="password" class="form-control" id="password"
                    placeholder="Ange lösenord">
            </div>

            <p v-if="error" class="error">{{ error }}</p>

            <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary"><i class="bi bi-box-arrow-in-right"></i> Logga in</button>
                <button @click="$router.push('/createuser')" class="btn btn-secondary"><i class="bi bi-person-plus"></i>
                    Skapa ny användare</button>
            </div>
        </form>
    </div>

    <!-- Laddningsmeddelande plus ikon som visas innan hämtningen från servern är klar -->
    <div v-if="isLoading" class="loading text-center">
        <p>Du loggas in...</p>
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

</template>

<script>
import axios from "axios";

export default {
    name: "Login",
    data() {
        return {
            // States för inputfälten
            username: "",
            password: "",
            error: null,
            isLoading: false,   // Laddningsikon för inlogg
        };
    },
    methods: {
        // Funktion för att logga in
        async loginUser() {
            const user = {
                username: this.username,
                password: this.password,
            };

            // Validering
            if (!this.username.trim() || !this.password.trim()) {
                this.error = "Du måste ange användarnamn och lösenord.";
                return;
            }
            
            this.isLoading = true;

            try {
                // Post med axios
                const response = await axios.post("https://zoox-privat-backend.onrender.com/users/login", user, {
                    withCredentials: true, //   För cookies
                });

                if (response.status === 200) {
                    this.$router.push("/products");
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        this.error = "Fel användarnamn eller lösenord.";
                    } else if (error.response.status === 401) {
                        this.error = "Ogiltiga användaruppgifter, testa igen.";
                    }
                } else {
                    console.error("Ett fel inträffade:", error);
                }
            } finally {
                this.isLoading = false;
            }
        },
    },
};

</script>


<style scoped>
.error {
    color: red;
}
</style>