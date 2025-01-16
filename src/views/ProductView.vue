<!-- Sida för produkter -->

<template>
    <div class="d-flex justify-content-start">
        <button @click="logoutUser" class="btn btn-danger btn-sm ms-auto">
            <i class="bi bi-box-arrow-right"></i> Logga ut
        </button>

    </div>

    <h1 class="text-center mb-4">Produkter</h1>

    <!-- Lägga till komponenten -->
    <AddProduct @productAdded="getProducts()" />

    <h2 class="text-center mb-4 mt-4">Tillgängliga produkter</h2>

    <!-- Sök och kategori del-->
    <div class="container mb-5">
        <div class="row justify-content-center g-2">
            <div class="col-12 col-md-6 col-lg-4">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Sök produkt..." v-model="searchInput" />
                    <span class="input-group-text"><i class="bi bi-search"></i></span>
                </div>
            </div>

            <!-- Dropdown för kategorier -->
            <div class="col-12 col-md-6 col-lg-4">
                <select class="form-select" v-model="selectedCategory" @change="filterProducts">
                    <option value="">Alla kategorier</option>
                    <option v-for="category in categories" :value="category._id" :key="category._id">{{ category.name }}
                    </option>
                </select>
            </div>
        </div>
    </div>

    <!-- Om inga produkter hittas i sök -->
    <div v-if="searchedProducts.length === 0" class="text-center mt-4">
        <p>Tyvärr, inga produkter hittades...</p>
    </div>


    <!-- Laddningsmeddelande plus ikon som visas innan hämtningen från servern är klar -->
    <div v-if="isLoading" class="loading text-center">
        <p>Hämtar produkter...</p>
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <!-- Grid för cards -->
    <div class="container mb-5 mt-3">
        <div class="row g-4 justify-content-center">
            <div v-for="product in searchedProducts" :key="product._id" class="col-12 col-sm-6 col-md-4 col-lg-3 cards">
                <Product :product="product" @deleteProduct="deleteProduct" @updateProduct="updateProduct" />
            </div>
        </div>
    </div>
</template>

<script>
import Product from "../components/Product.vue";
import AddProduct from "@/components/AddProduct.vue";
import axios from "axios";

export default {
    data() {
        return {
            products: [],
            categories: [],
            isLoading: true,
            selectedCategory: "",    // Vald kategori
            searchInput: "",         // Input från sök
        };
    },
    components: {
        Product,
        AddProduct
    },
    computed: {
        // Sökfunktion
        searchedProducts() {
            if (!this.searchInput) {
                return this.products; // Alla produkter om inget sökinput
            }
            const input = this.searchInput.toLowerCase();
            return this.products.filter(product =>
                product.name.toLowerCase().includes(input) || // Sök i namn
                product.description.toLowerCase().includes(input) // Sök i beskrivning
            );
        }
    },
    methods: {

        // Hämtar produkter utifrån kategori eller alla produkter om ingen kategori vald
        async getProducts(categoryId = "") {
            this.isLoading = true;
            try {
                const url = categoryId ? `https://zoox-privat-backend.onrender.com/products/category/${categoryId}` : `http://localhost:5000/products`;
                const response = await axios.get(url, {
                    withCredentials: true,
                });
                this.products = response.data;
            } catch (error) {
                console.error(error.message);
                // Ta bort laddningsikon
            } finally {
                this.isLoading = false;
            }
        },

        // Hämtar kategorier
        async getCategories() {
            try {
                const response = await axios.get(`https://zoox-privat-backend.onrender.com/categories`, {
                    withCredentials: true,
                });
                this.categories = response.data;
            } catch (error) {
                console.error(error.message);
            }
        },

        // Filtrerar utifrån vald kategori
        filterProducts() {
            this.getProducts(this.selectedCategory);
        },

        // Raderar en produkt och uppdaterar listan
        async deleteProduct(productId) {
            const confirmDelete = confirm("Är du säker på att du vill ta bort produkten?");

            if (confirmDelete) {
                try {
                    await axios.delete(`https://zoox-privat-backend.onrender.com/products/${productId}`, {
                        withCredentials: true,
                    });
                    this.getProducts(this.selectedCategory);    // Uppdatera efter delete
                } catch (error) {
                    console.error(error.message);
                }
            } else {
                console.log("Avbryt raderingen.");
            }
        },

        // Ändra produkt, funktion som skickar till updateproduct-vyn med id
        async updateProduct(productId) {
            try {
                this.$router.push({ name: 'UpdateProductView', params: { id: productId } });
            } catch (error) {
                console.error("Fel vid siduppladdning:", error.message);
            }
        },

        // Logga ut användaren
        async logoutUser() {
            try {
                const response = await axios.get(`https://zoox-privat-backend.onrender.com/users/logout`, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    this.$router.push("/");   // Skicka tillbaka till start/inlogg-sidan
                } else {
                    console.log("Något gick fel vid utloggningen");
                }
            } catch (error) {
                console.error(error.message);
            }
        }
    },

    // Hämta kategorier och produkter vid laddning
    mounted() {
        this.getCategories();
        this.getProducts();
    }
};

</script>


<style scoped>
h2 {
    font-size: 1.2em;
}

.cards {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: center;
}

@media screen and (max-width: 786px) {
    #table-body {
        font-size: 0.9em;
    }

    th {
        font-size: 0.85em;
    }
}
</style>