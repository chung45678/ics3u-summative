<script setup>
import { RouterLink } from 'vue-router';
import { useStore } from '../store';
import { useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';
const store = useStore();
const router = useRouter();

if (store.user !== null) {
const displayName = store.user.displayName;
console.log(displayName)
}

const logout = () => {
  store.user = null;
  router.push('/');
  signOut(auth);
};
</script>

<template>
  <div class ="header">
    <RouterLink to="/" class="logo-link">
      <img src="/src/assets/logo.png" class="logo" />
    </RouterLink>
    <ul>
      <div v-if="store.user">
        <li class="welcome-message">
          Welcome, {{store.user.displayName }}!
        </li>
      </div>
      <li>
        <RouterLink to="/movies">New Movies</RouterLink>
      </li>
      <li><a href="">TV Shows</a></li>
      <li><a href="">Actors</a></li>

      <li v-if="!store.user">
        <RouterLink to="/register" class="entry">SIGN UP</RouterLink>
      </li>
      <li v-if="!store.user">
        <RouterLink to="/login" class="entry">SIGN IN</RouterLink>
      </li>

      <div v-else="" class="user-options">
        <li>
          <RouterLink to="/cart" class="entry">Cart</RouterLink>
        </li>
        <li>
          <RouterLink to="/settings" class="entry">Settings</RouterLink>
        </li>
        <li>
          <button @click="logout" class="entry">Logout</button>
        </li>
      </div>
    </ul>
  </div>
</template>


<style scoped>
.header {
  background-color: #000000;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.header ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  
}

.header li {
  margin: 0 10px;
  font-weight: bold;
  padding: 5px;
  color: rgb(255, 255, 255);
}

.header a {
  text-decoration: none;
  font-size: 16px;
  transition: 0.3s;
  color: rgb(255, 255, 255);
}

.logo {
  width: 150px;
  height: auto;
}

.user-options {
  display: flex;
  align-items: center;

}

.entry {
  background-color: rgb(255, 0, 0);
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
  border-radius: 30px;
  text-decoration: none;
  border-style: none;
  display: inline-block;
  text-align: center;
}

.entry:hover {
  background-color: rgb(81, 1, 1);
}


</style>