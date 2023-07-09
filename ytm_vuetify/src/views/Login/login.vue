<template>
    <v-main class="bg-blue-lighten-5 h-100">
        <v-sheet color="bg-blue-lighten-1" width="300" class="mx-auto h-50 w-50">
            <v-form fast-fail @submit.prevent>
            
            <v-card-title class="text-h6 text-md-h5 text-lg-h4">User Login</v-card-title>
                
              <v-text-field
                v-model="username"
                label="User Name"
              ></v-text-field>
            
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
      

        data () {
      return {
        show: true,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },

      }
  </script>