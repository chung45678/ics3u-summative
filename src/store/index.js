import { ref } from "vue";
import { defineStore } from "pinia";

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

