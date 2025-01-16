<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';

const response = ref(null);
const numbers = ref([]);

numbers.value = (() => {
  const set = new Set();

  while (true) {
    set.add(Math.floor(Math.random() * 19));

    if (set.size === 3) {
      return set;
    }
  }
})();


onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}`);
})
</script>

<template>
  <div class="movie-heading">
    <h1>Now Playing</h1>
  </div>
  <div class="movie-gallery">
    <div v-if="response" class="movie-list">
      <div v-for="number in numbers" :key="response.data.results[number].id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${response.data.results[number].poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ response.data.results[number].title }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #121212; 
  color: #ffffff; 
  font-family: 'Arial', sans-serif;
}

.movie-heading {
  text-align: center;
  margin: 30px 0;
}

.movie-heading h1 {
  font-size: 3rem;
  color: #ff3333; 
  margin: 0;
}

.movie-gallery {
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-bottom: 40px;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.movie-card {
  background-color: #1e1e1e; 
  border: 1px solid #ff3333; 
  border-radius: 15px;
  width: 300px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(255, 51, 51, 0.3); 
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 51, 51, 0.5); 

}

.movie-poster {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6); 
}

.movie-title {
  font-size: 1.2rem;
  color: #ffffff;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
  font-weight: bold;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .movie-list {
    flex-direction: column;
    align-items: center;
  }

  .movie-card {
    width: 90%; 
  }
}
</style>
