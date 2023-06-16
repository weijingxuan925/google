<template>
  <div>
    <h1>Login</h1>
    <form @submit="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <p>{{ loginMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "LoginPage", // Modify the component name to use multiple words
  data() {
    return {
      username: "",
      password: "",
      loginMessage: ""
    };
  },
  methods: {
    async handleLogin(event) {
      event.preventDefault();

      try {
        const response = await fetch("/login", {
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
          this.loginMessage = "Login successful!";
        } else {
          this.loginMessage = "Login failed: " + data.msg;
        }
      } catch (error) {
        console.error(error);
        this.loginMessage = "An error occurred during login.";
      }
    }
  }
};
</script>
