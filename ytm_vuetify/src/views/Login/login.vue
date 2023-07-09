<template>
  <v-main class="bg-blue-lighten-5 h-100">
    <v-sheet color="bg-blue-lighten-1" width="300" class="mx-auto h-50 w-50">
      <v-form @submit.prevent="login">
        <v-card-title class="text-h6 text-md-h5 text-lg-h4">User Login</v-card-title>

        <v-text-field v-model="username" label="User Name"></v-text-field>

        <v-text-field
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="[rules.required, rules.min]"
            name="input-10-2"
            label="Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show = !show"
        ></v-text-field>

        <v-btn color="grey-darken-3" type="submit" block class="mt-4">Submit</v-btn>
      </v-form>
    </v-sheet>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      username: '',
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
    };
  },
  methods: {
    login() {
      const credentials = {
        username: this.username,
        password: this.password,
      };

      this.$http
          .post('http://localhost:3000/api/login', credentials)
          .then((response) => {
            console.log('Login successful');
            console.log('Current logged-in user:', this.username);

            this.$snackbar.open('Login successful', 'OK', {
              duration: 3000,
            });

            this.$router.push('/home');
          })
          .catch((error) => {
            console.error('Login failed');
            this.$snackbar.open('Login failed', 'OK', {
              duration: 3000,
            });
          });
    },
  },
};
</script>
  