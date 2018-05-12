<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="../../static/img/bbnkl-logo2.png" alt="Vuetify.js" class="mb-5">
      </v-layout>
    </v-slide-y-transition>
      <div id="player"></div>

    {{ cams }}
    <div  id="jsplaylist">
      <!-- optional prev/next buttons -->
      <a class="fp-prev"></a>
      <a class="fp-next"></a>
    </div>

  </v-container>
</template>
<script>
  /* eslint-disable no-unused-expressions */

  export default {
    data() {
      return {
        // cams: [],
      };
    },
    created() {
      // console.log(3333333333);
      this.$store.dispatch('getCams');
    },
    mounted() {
      const container = document.getElementById('player');
      // const jsplaylist = document.getElementById('jsplaylist');
      window.flowplayer(container, {
        clip: {
          live: true,
          ratio: 9 / 16,
          sources: [
            {
              type: 'application/x-mpegurl',
              src: 'https://lk.bbnkl.ru/cams/CamVideoRecorder/cam000020.stream_aac/playlist.m3u8',
            },
          ],
        },
      });
    },
    computed: {
      cams() {
        const plist = this.$store.getters.getCams.map(item => ({
          sources: [{
            src: item.attributes.playUrl,
            type: 'application/x-mpegurl',
          }],
        }));
        window.flowplayer('#jsplaylist', {
          // rtmp: 'rtmp://s3b78u0kbtx79q.cloudfront.net/cfx/st',
          playlist: plist,
        });
      },
    },
  };
</script>
