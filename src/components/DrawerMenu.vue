<template>
    <v-navigation-drawer
      fixed
      v-model="$store.state.drawer"
      app
    >
      <v-toolbar flat>
        <!--<v-list>-->
        <!--<v-list-tile>-->
        <!--<v-list-tile-title class="title">-->
        <!--{{ userStatus.email }}-->
        <!--</v-list-tile-title>-->
        <!--</v-list-tile>-->
        <!--<v-list-tile-content>-->
        <!--<v-list-tile-title v-text="userStatus.balance"></v-list-tile-title>-->
        <!--</v-list-tile-content>-->
        <!--</v-list>-->
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="../../static/img/bbnkl-logo.png">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ userStatus.email }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ userStatus.balance }} </v-list-tile-sub-title>
          </v-list-tile-content>
          <!--<v-list-tile-action>-->
          <!--<v-btn icon ripple>-->
          <!--<v-icon color="grey lighten-1">info</v-icon>-->
          <!--</v-btn>-->
          <!--</v-list-tile-action>-->
        </v-list-tile>
      </v-toolbar>



      <v-divider inset></v-divider>
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
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        clipped: false,
        // drawer: true,
        items: [{
          icon: 'bubble_chart',
          title: 'menu item',
        }],
      };
    },
    methods: {
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
