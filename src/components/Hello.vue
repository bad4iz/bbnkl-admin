<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="../../static/img/bbnkl-logo2.png" alt="бебинокль" class="mb-5">
      </v-layout>
    </v-slide-y-transition>
    <!--<div id="player"></div>-->
    <div id="jsplaylist">
      <!-- optional prev/next buttons -->
      <a class="fp-prev"></a>
      <a class="fp-next"></a>
    </div>

  </v-container>
</template>
<script>
  /* eslint-disable no-unused-expressions */
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        plist: this.cams,
        info: '',
      };
    },
    created() {

    },
    mounted() {
    },
    computed: {
      // примешиваем геттеры в вычисляемые свойства оператором расширения
      ...mapGetters({
        // проксируем `this.cams` в `store.getters.getCams`
        cams: 'getCams',
        // ...
      }),
    },
    watch: {
      cams(val) {
        window.flowplayer('#jsplaylist', {
          playlist: val.map(item => ({
            sources: [{
              type: 'application/x-mpegurl',
              src: item.attributes.playUrl,
            }],
          })),
        });
      },
    },
  };
</script>
