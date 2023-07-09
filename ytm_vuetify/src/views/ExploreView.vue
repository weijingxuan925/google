<template>
  <v-app id="inspire">
    <v-main class="bg-blue-lighten-5">
      <v-container>
        <v-row>
          <template v-for="n in 4" :key="n">
            <v-col
              class="mt-2"
              cols="12"
            >
              <strong>类别 {{ n }}</strong>
            </v-col>
            <v-col
              v-for="j in 6"
              :key="`${n}${j}`"
              cols="6"
              md="2"
            >
              <v-sheet height="150"></v-sheet>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  </template>
  
  <script>
    export default {
      data: () => ({ drawer: null }),
    }
  </script>