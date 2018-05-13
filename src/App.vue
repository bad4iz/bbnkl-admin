<template>
  <v-app light>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              {{ userStatus.email }}
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-text="userStatus.balance"></v-list-tile-title>
          </v-list-tile-content>
        </v-list>
      </v-toolbar>

      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          exact
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-footer absolute
                height="260px">
        <v-card
          flat
          tile
          class="indigo lighten-1 white--text text-xs-center"
        >
          <v-card-text>
            <v-btn v-if="this.$store.getters.getToken"
                   color="blue-grey"
                   class="white--text"
                   @click="logout"
            >
              Logout
              <v-icon right dark>rowing</v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text class="white--text">
            i sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus.
          </v-card-text>
          <v-card-text class="white--text">
            &copy;{{ new Date().getFullYear() }} — <strong>bbnkl</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <!--<v-btn-->
      <!--icon-->
      <!--light-->
      <!--@click.stop="miniVariant = !miniVariant"-->
      <!--&gt;-->
      <!--<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>-->
      <!--</v-btn>-->
      <v-btn
        icon
        light
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
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

  export default {
    template: '<Auth/>',
    components: { Auth },
    data() {
      return {
        cordova: Vue.cordova,
        clipped: true,
        drawer: false,
        items: [{
          icon: 'bubble_chart',
          title: 'menu item',
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Bbnkl Админ',
      };
    },
    created() {
      this.$store.dispatch('getCams');
      this.$store.dispatch('userStatus');
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
      logout() {
        this.drawer = false;
        this.$store.dispatch('logout');
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
