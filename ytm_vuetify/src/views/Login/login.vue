<template>
  <v-dialog v-model="dialogVisible" max-width="400px">
    <v-card>
      <v-card-title class="text-h6">User Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field v-model="username" label="User Name"></v-text-field>
          <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="[rules.required, rules.min]"
              name="input-10-2"
              label="Password"
              hint="At least 8 characters"
              class="input-group--focused"
              @click:append="show = !show"
          ></v-text-field>
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.text }}
      <v-btn text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  data() {
    return {
      dialogVisible: true,
      show: true,
      username: '',
      password: '',
      snackbar: {
        show: false,
        text: '',
        color: ''
      },
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    login() {
      const credentials = {
        username: this.username,
        password: this.password,
      };

      console.log('Form Data:', credentials);

      axios
          .post('http://localhost:3000/api/login', credentials)
          .then(() => {
            // 显示一个提示消息
            alert('Login successful')
            console.log('Login successful');
            console.log('Current logged-in user:', this.username);

            // 设置 Cookie
            document.cookie = `username=${this.username}`;
            document.cookie = `isLoggedIn=true`;



            // 清空表单数据
            this.username = '';
            this.password = '';

            // 关闭对话框
            this.dialogVisible = false;

            // 导航到其他页面
            this.$router.push('/library').then(() => {
              location.reload();
            });
          })
          .catch(() => {
            console.error('Login failed');
            alert('Login failed')
          });
    },
  },
};
</script>
