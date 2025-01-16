<template>
    <div class="card h-100">
        <div class="card-body text-center bg-light">
            <h5 class="card-title"><strong>{{ product.name }}</strong></h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text"><strong>Pris:</strong> {{ product.price }} kr</p>

            <!-- Dropdown för att ändra antal i lager -->
            <div class="mb-3">
                <label for="quantity" class="form-label">Antal i lager:</label>
                <select v-model="quantity" @change="updateQuantity" class="form-select form-select-sm">
                    <option v-for="n in 200" :key="n" :value="n">{{ n }}</option>
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <!-- Knapp för att radera produkt med emit till delete-funktionn-->
                <button @click="$emit('deleteProduct', product._id)" class="btn btn-danger btn-sm">
                    <i class="bi bi-trash"></i> Ta bort
                </button>

                <!-- Emit för att uppdatera en produkt vid klick på ikonen -->
                <button @click="$emit('updateProduct', product._id)" class="btn btn-primary btn-sm">
                    <i class="bi bi-pencil"></i> Ändra
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: {
        product: Object
    },
    data() {
        return {
            quantity: this.product.quantity // Antalet
        };
    },

    methods: {
        // Funktion för att ändra endast antalet med PATCH
        async updateQuantity() {
            try {
                const updates = { quantity: this.quantity };

                await axios.patch(`http://localhost:5000/products/${this.product._id}`, updates, {
                    withCredentials: true,
                });

                alert("Antalet uppdaterades!");
            } catch (error) {
                console.error("Kunde inte uppdatera antalet:", error.message);
            }
        }

    }
};

</script>


<style scoped>
.card {
    width: 100%;
    max-width: 300px;
}

@media screen and (max-width: 786px) {
    h5 {
        font-size: 1em;
    }
}
</style>
