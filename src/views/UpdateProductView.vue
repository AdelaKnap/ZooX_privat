<template>
    <h1 class="text-center mt-3 mb-5">Uppdatera produkt</h1>

    <div class="container d-flex justify-content-center mb-5">

        <form class="w-100 bg-light p-5" style="max-width: 700px" @submit.prevent="saveChanges">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="name" placeholder="Produktnamn" v-model="product.name">
                <label for="name">Produktnamn</label>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="description" placeholder="Beskrivning"
                    v-model="product.description">
                <label for="description">Beskrivning</label>
            </div>

            <div class="form-floating mb-3">
                <select v-model="product.category" id="category" class="form-select">
                    <option value="">Välj kategori</option>
                    <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
                </select>
                <label for="category">Kategori</label>
            </div>

            <div class="form-floating mb-3">
                <input type="number" class="form-control" id="price" placeholder="Pris" v-model="product.price">
                <label for="price">Pris</label>
            </div>

            <div class="form-floating mb-3">
                <input type="number" class="form-control" id="quantity" placeholder="Antal i lager"
                    v-model="product.quantity">
                <label for="quantity">Antal i lager</label>
            </div>

            <ul v-if="errorMessages.length" class="errorText">
                <li v-for="message in errorMessages" :key="message">{{ message }}</li>
            </ul>

            <div class="button-group">
                <button type="submit" class="btn btn-success"><i class="bi bi-check-circle"></i> Spara</button>
                <button @click="cancel" type="button" class="btn btn-danger"><i class="bi bi-x-circle"></i> Avbryt</button>
            </div>

        </form>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],      // Hämta produktens id från ulr:en
    data() {
        return {
            product: {
                name: '',
                description: '',
                category: '',
                price: '',
                quantity: ''
            },
            categories: [],
            errorMessages: []
        };
    },
    methods: {
        // Hämta produkten utifrån id
        async fetchProduct() {
            try {
                const response = await axios.get(`https://zoox-privat-backend.onrender.com/products/${this.id}`, {
                    withCredentials: true,
                });
                const fetchedProduct = response.data;

                // Skapa nytt objekt/kopia med bara id för kategorin
                this.product = {
                    ...fetchedProduct,
                    category: fetchedProduct.category._id,
                };
            } catch (error) {
                console.error("Kunde inte hämta produkten:", error.message);
            }
        },

        // Hämta kategorierna
        async fetchCategories() {
            try {
                const response = await axios.get(`https://zoox-privat-backend.onrender.com/categories`);
                this.categories = response.data;
            } catch (error) {
                console.error("Kunde inte hämta kategorier:", error.message);
            }
        },

        // Spara ändringarna 
        async saveChanges() {
            this.errorMessages = [];

            // Validering
            if (!this.product.name.trim()) this.errorMessages.push("Du måste ange ett produktnamn.");
            if (!this.product.description.trim()) this.errorMessages.push("Du måste ange en beskrivning.");
            if (!this.product.category) this.errorMessages.push("Du måste välja en kategori.");
            if (!this.product.price) this.errorMessages.push("Du måste sätta ett pris.");
            if (!this.product.quantity) this.errorMessages.push("Du måste ange antal i lager.");

            if (this.errorMessages.length > 0) {   // return vid fel
                return;
            }

            try {
                // Produkten med ändringarna
                const productToUpdate = {
                    name: this.product.name,
                    description: this.product.description,
                    category: this.product.category,
                    price: this.product.price,
                    quantity: this.product.quantity
                };

                // PUT -anrop
                await axios.put(`https://zoox-privat-backend.onrender.com/products/${this.product._id}`, productToUpdate, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true  
                });


                alert("Produkten ändrades!");
                this.$router.push("/products");   // Skicka tillbaka till produktsidan
            } catch (error) {
                console.error("Kunde inte spara ändringarna:", error.response?.data || error.message);
            }
        },

        cancel() {
            this.$router.push("/products"); // tillbaka till produktlistan vid klick på avbryt
        }
    },

    mounted() {
        this.fetchProduct();
        this.fetchCategories();
    }
};

</script>

<style scoped>
h2 {
    font-size: 1.4em;
}

.form-select {
    font-size: 0.9em;
    line-height: 2.4em;
    height: 70px;
}

.form-control {
    height: 70px;
}

.errorText {
    color: red;
    margin-top: 2%;
}

.button-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
}

@media screen and (max-width: 786px) {
    .container {
        padding: 1%;
    }
}
</style>
