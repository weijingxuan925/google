<template>
  <v-main class="bg-grey-darken-3 h-100">
    <v-sheet color="grey-lighten-2" width="300" class="mx-auto h-50 w-50">
      <v-form fast-fail @submit.prevent>
        <v-card-title class="text-h6 text-md-h5 text-lg-h4"
          >User Register</v-card-title
        >

        <v-text-field v-model="username" label="User Name"></v-text-field>

        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="[rules.required, rules.min]"
          name="input-10-2"
          label="Password"
          v-model="password"
          hint="At least 8 characters"
          class="input-group--focused"
          @click:append="show = !show"
        ></v-text-field>

        <router-link :to="`/login`">
          <p class="font-weight-regular" style="color: #b71c1c">Login</p>
        </router-link>

        <v-btn
          @click="register()"
          color="red-lighten-1"
          type="submit"
          block
          class="mt-4"
          >Submit</v-btn
        >
      </v-form>
    </v-sheet>
  </v-main>
</template>
  
  <script>
import router from "../router/index.js";
export default {
  data() {
    return {
      show: true,
      password: "",
      username: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        //emailMatch: () => (`The email and password you entered don't match`),
      },
    };
  },
  methods: {
    register() {
      fetch("http://localhost:3030/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: this.username,
          password: this.password,
        }),
      })
        .then(router.push({ path: "/login" }))
        .catch((err) => console.log(err.message));
    },
  },
};
</script>