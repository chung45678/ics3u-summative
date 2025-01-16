<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Genres from "../components/Genres.vue";

const genresList = [
  {
    id: 28,
    genreName: "Action"
  },
  {
    id: 12,
    genreName: "Adventure"
  },
  {
    id: 14,
    genreName: "Fantasy"
  },
  {
    id: 80,
    genreName: "Crime"
  },
  {
    id: 35,
    genreName: "Comedy"
  },
]
</script>

<template>
  <Header />
  <Genres :genres="genresList" />
  <Footer />
</template>

<style scoped></style>