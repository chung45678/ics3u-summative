<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Details from "../components/Details.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <Header />
  <Details :movieId="Number(route.params.id)" />
  <Footer />
</template>

<style scoped></style>