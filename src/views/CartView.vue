<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from '../store';
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const store = useStore();

const message = ref(false);

function checkout() {
    if (store.cart.size >= 1) {
        store.cart.clear()
        localStorage.clear(`cart_${store.user.email}`);
        alert("Thank you for your purchase!")
    }
}
</script>

<template>
    <Header />
    <div class="cart">
        <h1>Shopping Cart</h1>
        <div class="item" v-for="([key, value]) in store.cart">
            <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" />
            <h1>{{ value.title }}</h1>
            <button @click="store.cart.delete(key)">Remove</button>
        </div>
        <button @click="checkout">Checkout</button>
        <div class="message" v-if="message">Thank you for Shopping!</div>
    </div>
    <Footer />
</template>

<style scoped>
h1 {
    color: #e50914;
    text-align: center;
}

button {
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 15px;
    background-color: #e50914;
    color: white;
    text-decoration: none;
    border-radius: 5px;
}

.cart {
    display: flex;
    flex-direction: column;
    background-color: #000000;
    gap: 2rem;
    height: 100vw;
}

.item {
    display: flex;
    align-items: center;
    gap: 2rem;
}

img {
    width: 10%;
    border-radius: 5%;
}
</style>