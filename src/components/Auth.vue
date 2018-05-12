<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="../../static/img/bbnkl-logo2.png" alt="Vuetify.js" class="mb-5">

        <v-form v-model="valid">
          <v-text-field
            v-model="userName"
            label="username"
            required
            class="input-group"
          ></v-text-field>
          <v-text-field
            :append-icon="passVisible ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (passVisible = !passVisible)"
            :type="passVisible ? 'password' : 'text'"
            name="password"
            label="Enter your password"
            v-model="password"
            class="input-group"
          ></v-text-field>
        </v-form>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        passVisible: false,
        userName: '',
        password: '',
      };
    },
    created() {
    },
    methods: {
      auth() {
        // Handle the back-button event on Android. By default it will exit the app.
        navigator.app.exitApp();
      },
    },
    watch: {
      userName: function (val) {
        this.$store.dispatch('setUserName', val);
      },
    },
  };
</script>
