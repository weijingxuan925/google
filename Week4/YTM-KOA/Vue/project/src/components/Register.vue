<template>
  <div>
    <h1>Register</h1>
    <form @submit="handleRegister">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    <p>{{ registerMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      registerMessage: ""
    };
  },
  methods: {
    async handleRegister(event) {
      event.preventDefault();

      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        const data = await response.json();

        if (data.status === 0) {
          this.registerMessage = "Registration successful!";
        } else {
          this.registerMessage = "Registration failed: " + data.msg;
        }
      } catch (error) {
        console.error(error);
        this.registerMessage = "An error occurred during registration.";
      }
    }
  }
};
</script>
