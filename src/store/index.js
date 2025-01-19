import { ref } from "vue"
import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useStore = defineStore('store', () => {
    const email = ref("");
    const password = ref("")
    const cart = ref(new Map());
    const firstName = ref("");
    const lastName = ref("");
    const username = ref("");

    function $reset() {
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      password.value = '';
      cart.value = new Map();
    };

    return { email, password, cart, firstName, lastName, username, $reset}
    
  })

  export const userAuthorized = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      try {
        const store = useStore();
        store.user = user;
        const storedCart = localStorage.getItem(`cart_${store.user?.email}`);
        store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
        resolve();
      } catch (error) {
        reject();
      }
    })
  })