<template>
    <div class="container d-flex justify-content-center mb-5">

        <form @submit.prevent="createUser" class="w-100 bg-light p-4" style="max-width: 600px;">

            <div class="mb-3">
                <label for="name" class="form-label mb-1">Namn:</label>
                <input v-model="name" type="text" class="form-control" id="name" placeholder="Ange för- och efternamn">
            </div>

            <div class="mb-3">
                <label for="mail" class="form-labe mb-1">E-post:</label>
                <input v-model="mail" type="mail" class="form-control" id="mail" placeholder="Ange epost-adress">
            </div>

            <div class="mb-3">
                <label for="username" class="form-label mb-1">Användarnamn:</label>
                <input v-model="username" type="text" class="form-control" id="username"
                    placeholder="Ange ett användarnamn">
            </div>
            <div class="mb-4">
                <label for="password" class="form-label mb-1">Lösenord:</label>
                <input v-model="password" type="password" class="form-control" id="password"
                    placeholder="Ange ett lösenord">
            </div>

            <!-- Loopa genom ev. felmeddelanden -->
            <ul v-if="error.length" class="error">
                <li v-for="message in error" :key="message">{{ message }}</li>
            </ul>

            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary"><i class="bi bi-plus-circle"></i> Skapa användare</button>
                <button type="button" class="btn btn-danger ms-2" @click="cancel"><i class="bi bi-x-circle"></i> Avbryt</button>
            </div>
        </form>
    </div>

</template>

<script>
import axios from "axios";

export default {
    name: "CreateUser",
    data() {
        return {
            // States för inputfälten
            name: "",
            mail: "",
            username: "",
            password: "",
            error: [],
        };
    },
    methods: {
        // Funktion för att skapa ny användare
        async createUser() {
            const user = {
                username: this.username,
                password: this.password,
            };

            // Validering
            this.error = []; // Rensa fel 
            if (!this.name.trim()) {
                this.error.push("Du måste ange namn.");
            }

            if (!this.mail.trim()) {
                this.error.push("Du måste ange epost-adress.");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.mail)) {
                this.error.push("Du måste ange en korrekt e-postadress.");
            }

            if (!this.username.trim() || this.username.length < 4) {
                this.error.push("Användarnamnet måste ha minst 4 tecken.");
            }

            if (!this.password.trim() || this.password.length < 4) {
                this.error.push("Lösenordet måste ha minst 4 tecken.");
            }

            if (this.error.length > 0) {
                return; // Avbryt om det finns fel
            }

            try {
                // Post med axios
                const response = await axios.post("http://localhost:5000/users", user);

                // Kontroll om statuskod 201, created
                if (response.status === 201) {
                    console.log(user);
                    this.$router.push("/");  // Till inloggsidan för att kunna logga in
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 500) {
                        this.error.push("Användarnamnet är redan upptaget.");
                    } else {
                        this.error.push("Fel vid skapandet av ny användare.");
                    }
                } else {
                    console.error("Ett fel inträffade:", error);
                }
            }
        },

        // Funktion för att avbryta
        cancel() {
            this.$router.push("/"); // till startsidan
        },
    },
};

</script>


<style scoped>
.error {
    color: red;
}
</style>