<template>
  <v-app-bar color="bg-light-blue-darken-3">
    <v-container class="fill-height d-flex align-center">
      <!-- Logo -->
      <div class="logo">
        <v-icon color="blue" icon="mdi-music" size="large"></v-icon>
        <v-toolbar-title>YTM</v-toolbar-title>
      </div>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Home Button -->
      <v-btn variant="text" to="/home">Home</v-btn>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Explore Button -->
      <v-btn variant="text" to="/explore">Explore</v-btn>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Library Button -->
      <v-btn variant="text" to="/library">Library</v-btn>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Search Field -->
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

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Login or Username Button -->
      <v-btn @click="openLogoutDialog" v-if="username">
        {{ username }}
      </v-btn>
      <v-btn v-else to="/login">Login</v-btn>

      <!-- Info Button -->
      <v-btn icon="mdi-information" size="small" to="/info"></v-btn>
    </v-container>
  </v-app-bar>

  <!-- Logout Dialog -->
  <v-dialog v-model="isLogoutDialogOpen" max-width="300">
    <!-- Dialog Content -->
  </v-dialog>
</template>

<style>
.logo {
  display: flex;
  align-items: center;
}

.logo v-icon {
  margin-right: 8px;
}

.navigation-bar .v-toolbar-title {
  margin-left: 4px;
}

.navigation-bar .v-btn {
  margin-left: 4px;
  margin-right: 4px;
}

.navigation-bar .v-btn:last-child {
  margin-right: 0;
}
</style>


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
