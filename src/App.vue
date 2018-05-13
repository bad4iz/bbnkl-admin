<template>
  <v-app light>
    <naw-drawer v-if="this.$store.getters.getToken"></naw-drawer>
    <v-toolbar fixed app >
      <v-toolbar-side-icon @click.stop="$store.commit('drawer')" light></v-toolbar-side-icon>
      <!--<v-btn-->
      <!--icon-->
      <!--light-->
      <!--@click.stop="miniVariant = !miniVariant"-->
      <!--&gt;-->
      <!--<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>-->
      <!--</v-btn>-->
      <!--<v-btn-->
        <!--icon-->
        <!--light-->
        <!--@click.stop="clipped = !clipped"-->
      <!--&gt;-->
        <!--<v-icon>web</v-icon>-->
      <!--</v-btn>-->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        light
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view v-if="this.$store.getters.getToken"></router-view>
      <auth v-else></auth>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Vue from 'vue';
  import Auth from './components/Auth';
  import NawDrawer from './components/DrawerMenu';

  export default {
    template: '<Auth/>',
    components: {
      Auth,
      NawDrawer,
    },
    data() {
      return {
        cordova: Vue.cordova,
        // clipped: false,
        drawer: true,
        // items: [{
        //   icon: 'bubble_chart',
        //   title: 'menu item',
        // }],
        // miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Bbnkl Админ',
      };
    },
    created() {
      // this.$store.dispatch('getCams');
      // this.$store.dispatch('userStatus');
      const self = this;
      this.cordova.on('deviceready', () => {
        self.onDeviceReady();
      });
    },
    methods: {
      onDeviceReady() {
        // Handle the device ready event.
        this.cordova.on('pause', this.onPause, false);
        this.cordova.on('resume', this.onResume, false);
        if (this.cordova.device.platform === 'Android') {
          document.addEventListener('backbutton', this.onBackKeyDown, false);
        }
      },
      onPause() {
        // Handle the pause lifecycle event.
        // console.log('pause');
      },
      onResume() {
        // Handle the resume lifecycle event.
        // SetTimeout required for iOS.
        setTimeout(() => {
          // console.log('resume');
        }, 0);
      },
      onBackKeyDown() {
        // Handle the back-button event on Android. By default it will exit the app.
        navigator.app.exitApp();
      },
    },
    computed: {
      // примешиваем геттеры в вычисляемые свойства оператором расширения
      ...mapGetters({
        // проксируем `this.cams` в `store.getters.getCams`
        userStatus: 'getUserStatus',
        // ...
      }),
    },
  };
</script>

<style>
  body {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }

  .footer { /* Apply this to v-bottom-nav if necessary. */
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
</style>
