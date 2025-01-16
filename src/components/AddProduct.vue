<template>

    <h2 class="text-center mb-3">Lägg till ny produkt</h2>

    <div class="container d-flex justify-content-center">
        <form class="w-100 bg-light p-4" style="max-width: 700px" @submit.prevent="addProduct()">
            <!-- Formulär -->
            <div class="mb-3 mt-4">
                <label for="name" class="form-label mb-1">Produktnamn</label>
                <input v-model="name" type="text" class="form-control" id="name" placeholder="Ange produktnamn">
            </div>

            <div class="mb-3">
                <label for="description" class="form-label mb-1">Beskrivning</label>
                <input v-model="description" type="text" class="form-control" id="description"
                    placeholder="Ange beskrivning">
            </div>

            <div class="mb-3">
                <label for="category" class="form-label mb-1">Kategori</label>
                <select v-model="category" id="category" class="form-select">
                    <option value="" disabled selected>Välj kategori</option>
                    <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="price" class="form-label mb-1">Pris</label>
                <input v-model="price" type="number" class="form-control" id="price" placeholder="Ange pris">
            </div>

            <div class="mb-3">
                <label for="quantity" class="form-label mb-1">Antal i lager</label>
                <input v-model="quantity" type="number" class="form-control" id="quantity"
                    placeholder="Ange antal i lager">
            </div>

            <!-- Loopa genom ev. felmeddelanden -->
            <ul v-if="errorMessages.length" class="errorText">
                <li v-for="message in errorMessages" :key="message">{{ message }}</li>
            </ul>

            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-success mb-4 mt-3"><i class="bi bi-plus-circle"></i> Lägg till</button>
            </div>
        </form>
    </div>
</template>

<script>
// För att använda axios
import axios from 'axios';

export default {
    data() {
        return {
            name: "",
            description: "",
            category: "",
            price: "",
            quantity: "",
            categories: [],
            errorMessages: []
        }
    },
    emits: ["productAdded"],
    methods: {

        // Hämta kategorierna
        async getCategories() {
            try {
                const response = await axios.get(`http://localhost:5000/categories`, {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    this.categories = response.data;
                }
            } catch (error) {
                console.error("Något gick fel vid hämtning av kategorier", error.message);
            }
        },

        // Funtion för att lägga till en produkt
        async addProduct() {
            this.errorMessages = [];

            // Validering
            if (!this.name.trim()) this.errorMessages.push("Du måste ange ett produktnamn.");
            if (!this.description.trim()) this.errorMessages.push("Du måste ange en beskrivning.");
            if (!this.price) this.errorMessages.push("Du måste sätta ett pris.");
            if (!this.quantity) this.errorMessages.push("Du måste ange antal i lager.");
            if (!this.category) this.errorMessages.push("Du måste välja en kategori.");

            if (this.errorMessages.length > 0) {
                return; // Avbryt om det finns fel
            }

            try {
                let productBody = {
                    name: this.name,
                    description: this.description,
                    category: this.category,
                    price: this.price,
                    quantity: this.quantity,
                };

                await axios.post(`http://localhost:5000/products`, productBody, {
                    withCredentials: true,
                });

                alert("Produkten lades till!");

                // Återställ formulär
                this.name = "";
                this.description = "";
                this.category = "";
                this.price = null;
                this.quantity = null;
                this.$emit("productAdded");
            } catch (error) {
                console.error("Kunde inte lägga till produkt:", error.response?.data || error.message);
            }
        }
    },
    mounted() {
        this.getCategories();  // Hämta kategorier vid laddning
    }
}

</script>

<style scoped>
h2 {
    font-size: 1.2em;
}

.container {
    margin-bottom: 3%;
}

.errorText {
    color: red;
    margin-top: 2%;
}

@media screen and (max-width: 786px) {
    .container {
        padding: 1%;
    }

    form {
        font-size: 0.9em;
    }
}
</style>
