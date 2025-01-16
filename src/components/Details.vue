<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const props = defineProps({ movieId: { type: Number, required: true } });
const response = ref(null)

onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/movie/${props.movieId}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`);
})
</script>

<template>
  <div v-if="response" class="movie-detail">
    <div class="movie-poster-container">
      <img :src="`https://image.tmdb.org/t/p/w500${response.data.poster_path}`" alt="Movie Poster"
        class="movie-poster" />
      <p class="tag-line">{{ response.data.tagline }}</p>
    </div>

    <div class="movie-details">
      <h1 class="movie-title">{{ response.data.original_title }}</h1>
      <p class="movie-overview">{{ response.data.overview }}</p>
      <p class="release-date">Release Date:  {{ response.data.release_date }}</p>
      <p class="origin-country">Origin Country:  {{ response.data.origin_country[0] }}</p>
      <p class="vote-average">Vote Average:  {{ response.data.vote_average }}</p>
      <a class="movie-site" :href="response.data.homepage" target="_blank">Official Movie Site</a>
    </div>
  </div>

  <div v-if="response" class="trailers">
    <h2 class="trailers-title">Trailers</h2>
    <div class="trailers-container">
      <div v-for="trailer in response.data.videos.results" :key="trailer.id" class="trailer-tile">
        <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
          <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer"
            class="trailer-thumbnail" /></a>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.movie-detail {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  color: white;
  background-color: #111;
}

.movie-poster-container {
  flex: 1 1 300px;
  text-align: center;
  background-color: #222;
  padding: 15px;
  border-radius: 10px;
}

.movie-poster {
  width: 100%;
  border-radius: 10px;
}

.tag-line {
  margin-top: 10px;
  font-style: italic;
  color: red;
}

.movie-details {
  flex: 2 1 500px;
  background-color: #111;
  padding: 20px;
  border-radius: 10px;
}

.movie-title {
  font-size: 2rem;
  margin-bottom: 15px;
  color: red;
}

.movie-overview,
.release-date,
.origin-country,
.vote-average {
  margin-bottom: 10px;
  font-size: 1rem;
}

.movie-site {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: red;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.movie-site:hover {
  background-color: darkred;
}

.trailers {
  margin-top: 30px;
  padding: 20px;
  background-color: #111;
  border-radius: 10px;
}

.trailers-title {
  font-size: 1.5rem;
  color: red;
  margin-bottom: 20px;
  text-align: center;
}

.trailers-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.trailer-tile {
  width: 200px;
  border: 1px solid #333;
  border-radius: 10px;
  overflow: hidden;
  background-color: #222;
  transition: transform 0.3s, box-shadow 0.3s;
}

.trailer-tile:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(255, 0, 0, 0.8);
}

.trailer-thumbnail {
  width: 100%;
  border-radius: 5px;
}
</style>
