<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from "../store"

const router = useRouter();
const store = useStore();
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const confPassword = ref('');

async function handleRegister() {
  console.log(firstName, lastName, password, email)
  if (!firstName.value) {
    alert('First Name is required.');
  } else if (!lastName.value) {
    alert('Last Name is required.');
  } else if (!email.value) {
    alert('Email is required.');
  } else if (!password.value) {
    alert('Password is required.');
  } else if (!confPassword.value) {
    alert('Re-entering the password is required.');
  } else if (password.value !== confPassword.value) {
    alert('Passwords do not match.');
  } else {
    try {
      const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
      await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
      store.user = user;
      router.push("/movies");
    } catch (error) {
      alert("There was an error creating a user with email!");
    }
  }
};

async function registerByGoogle() {
    try {
        const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
        store.user = user;
        router.push("/movies");
    } catch (error) {
        alert("There was an error creating a user with Google!");
    }
}
</script>
<template>
  <Header />
  <div class = "hero">
    <form class="login" @submit.prevent="handleRegister">
      <input required v-model="firstName" placeholder = "First Name">
      <input required v-model="lastName" placeholder = "Last Name">
      <input type="email" required v-model="email" placeholder = "E-mail">
      <input type="password" required v-model="password" placeholder = "Password">
      <input type="password" required v-model="confPassword" placeholder = "Confirm your password">
      <button type="submit">Sign-up</button>
      <button @click="registerByGoogle()" class="long-button">Register by Google</button>
    </form>
  </div>
  <Footer />
</template>

<style scoped>
.hero {
  display:flex;
  align-items: center;
  justify-content: center;
  padding: 80px;
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.long-button {
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 2px solid #ff0000;
  border-radius: 4px;
  outline: none;
  font-size: 1rem;
}
form.login {
  
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

form.login input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ff0000;
  border-radius: 4px;
  outline: none;
  font-size: 1rem;
}

form.login input:focus {
  border-color: darkred;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

form.login button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #ff0000;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form.login button[type="submit"]:hover {
  background-color: darkred;
}
</style>
