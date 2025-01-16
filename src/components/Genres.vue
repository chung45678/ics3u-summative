<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const props = defineProps(["genres"]);
const router = useRouter();
const store = useStore();
const selectedGenre = ref(12);
const response = ref(null);

const addToCart = (movie) => {
  store.cart.set(movie.id, {
    title: movie.title,
    url: movie.poster_path,
    overview: movie.overview,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  });
};

async function getMovieByGenre() {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`);
}

function getMovieDetails(id) {
  router.push(`/movies/${id}`);
}

onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${selectedGenre.value}`);
});
</script>

<template>
  <div class="genre-heading">
    <h1>Featured Movies by Genre</h1>
  </div>

  <div class="genre-selector">
    <select v-model="selectedGenre" @change="getMovieByGenre">
      <option v-for="genre of genres" :value="genre.id">{{ genre.genreName }}</option>
    </select>
  </div>

  <div class="movie-container">
    <div v-if="response" v-for="movie in response.data.results" :key="movie.id" class="movie-item"
      @click="getMovieDetails(movie.id)">
      <div class="movie-banners">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
      </div>
      <div class="movie-description">
        <h3>{{ movie.title }}</h3>
        <p>Release Date: {{ movie.release_date }}</p>
        <button @click.stop="addToCart(movie)" class="buy-button">
          {{ store.cart.has(movie.id) ? 'Added' : 'Buy' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #000;
  color: #fff;
  font-family: 'Arial', sans-serif;
  margin: 0;
}

.genre-heading {
  text-align: center;
  padding: 20px 0;
  background-color: #111;
  color: red;
  font-size: 2rem;
}

.genre-selector {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

select {
  padding: 10px;
  border: 2px solid red;
  background-color: #222;
  color: white;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
}

select option {
  background-color: #222;
  color: white;
}

.movie-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.movie-item {
  background-color: #111;
  border: 1px solid #333;
  border-radius: 10px;
  overflow: hidden;
  width: 200px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(255, 0, 0, 0.8);
}

.movie-banners img {
  width: 100%;
  height: auto;
  display: block;
}

.movie-description {
  padding: 10px;
  text-align: center;
}

.movie-description h3 {
  margin: 10px 0;
  color: red;
  font-size: 1.1rem;
}

.movie-description p {
  margin: 0;
  font-size: 0.9rem;
  color: white;
}

.buy-button {
  margin-top: 10px;
  padding: 5px 15px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.buy-button:hover {
  background-color: darkred;
}

.buy-button:disabled {
  background-color: #333;
  color: #999;
  cursor: not-allowed;
}
</style>
