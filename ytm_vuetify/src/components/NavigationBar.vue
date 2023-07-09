<template>
  <v-app-bar color="bg-light-blue-darken-3">
    <v-container class="fill-height d-flex align-center">
      <v-icon color="blue" icon="mdi-vuetify" size="large"></v-icon>
      <v-toolbar-title>Player</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" to="/home">Home</v-btn>
      <v-spacer></v-spacer>

      <v-btn variant="text" to="/explore">Explore</v-btn>
      <v-spacer></v-spacer>

      <v-btn variant="text" to="/library">Library</v-btn>
      <v-spacer></v-spacer>

      <v-text-field
          :loading="loading"
          density="compact"
          variant="solo"
          label="Search Music"
          append-inner-icon="mdi-magnify"
          size="x-large"
          single-line
          hide-details
          @click:append-inner="onClick"
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-btn @click="openLogoutDialog" v-if="username">
        {{ username }}
      </v-btn>
      <v-btn v-else to="/login">Login</v-btn>

      <!-- TODO: 添加info页面，介绍项目 -->
      <v-btn icon="mdi-information" size="small" to="/info"></v-btn>
    </v-container>
  </v-app-bar>

  <v-dialog v-model="isLogoutDialogOpen" max-width="300">
    <v-card>
      <v-card-title class="headline">Logout</v-card-title>
      <v-card-text>
        Are you sure you want to logout?
      </v-card-text>
      <v-card-actions>
        <v-btn text="logout" @click="closeLogoutDialog">Cancel</v-btn>
        <v-btn text="logout" @click="logout">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      username: null,  // 保存当前登录的用户名
      isLogoutDialogOpen: false, // 控制注销弹窗的显示状态
    }
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const cookies = document.cookie.split(';');
      const usernameCookie = cookies.find(cookie => cookie.trim().startsWith('username='));

      if (usernameCookie) {
        this.username = usernameCookie.split('=')[1];
      }
    },
    openLogoutDialog() {
      this.isLogoutDialogOpen = true; // 打开注销弹窗
    },
    closeLogoutDialog() {
      this.isLogoutDialogOpen = false; // 关闭注销弹窗
    },
    logout() {
      // 清除cookie
      document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // 更新用户名为空
      this.username = null;

      this.closeLogoutDialog(); // 关闭注销弹窗
    }
  }
}
</script>
