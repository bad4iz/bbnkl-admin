<template>
  <v-container fluid class="mya">
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
        <v-btn color="success" @click="auth">Войти</v-btn>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        passVisible: true,
        userName: 'filin49@yandex.com',
        password: '123456',
      };
    },
    created() {
      // this.$store.dispatch('getCams');
    },
    methods: {
      auth() {
        // Handle the back-button event on Android. By default it will exit the app.
        this.$store.dispatch('auth', this.password);
      },
    },
    watch: {
      userName(val) {
        this.$store.dispatch('setUserName', val);
      },
    },
  };
</script>
<style lang="sass" scoped>
.mya
  background-color: red
</style>
