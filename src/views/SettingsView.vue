<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from '../store';
import { ref } from 'vue';
import { getAuth, updateProfile, updatePassword } from 'firebase/auth';

const auth = getAuth();
const store = useStore()
const user = auth.currentUser;
const firstName = ref(user?.displayName?.split(' ')[0] || '');
const lastName = ref(user?.displayName?.split(' ')[1] || '');
const password = ref('');

async function saveChanges() {
  if (user) {
    try {
      await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });

      if (password.value) {
        await updatePassword(user, password.value);
      }

      store.user = user;
      alert('Changes saved!');
      location.reload();
    } catch (error) {
      alert("There was an error changing your settings!");
    }
  }
};

</script>

<template>
  <Header />
  <div class="hero">
    <div class="form-container">
      <h2>Settings</h2>
      <div class="user-info">
        <label for="firstName">Change First Name:</label>
        <input v-model="firstName" id="firstName" type="text" placeholder="First Name" class="input-field" />
        <label for="lastName">Change Last Name:</label>
        <input v-model="lastName" id="lastName" type="text" placeholder="Last Name" class="input-field" />
        <label for="password">Change Password:</label>
        <input v-model="password" id="password" type="password" placeholder="Password" class="input-field" />
        <button @click="saveChanges" class="button login">Save Changes</button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #000;
  color: white;
}

.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #111;
  padding: 20px;
}

.form-container {
  background-color: #222;
  padding: 30px;
  border-radius: 10px;

  text-align: center;
  width: 100%;
  max-width: 400px;
}

h2 {
  color: red;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-size: 1rem;
  text-align: left;
  color: white;
}

.input-field {
  padding: 10px;
  font-size: 1rem;
  border: 2px solid red;
  border-radius: 5px;
  background-color: #333;
  color: white;
  outline: none;
  width: 100%;
}

.input-field[readonly] {
  background-color: #444;
  color: #bbb;
  cursor: not-allowed;
}

.button {
  padding: 10px;
  font-size: 1rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

}

.button:hover {
  background-color: darkred;
}

.login {
  margin-top: 20px;
}
</style>
