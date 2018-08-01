<template>
  <div>
    <v-layout>
      <v-flex xs6 class="mr-1">
        <panel title="Song Metadata">
          <div slot="main">
            <v-layout>
              <v-flex xs6>
                <div class="song-title">
                  {{ song.title }}
                </div>
                <div class="song-artist">
                  {{ song.artist }}
                </div>
                <div class="song-genre">
                  {{ song.genre }}
                </div>
                <v-btn @click="navigateTo({name: 'edit-song', params: {songId: song.id}})" class="light-blue accent-1 mt-2">Edit</v-btn>
              </v-flex>

              <v-flex xs6>
                <img class="albam-image" :src="song.albamImageUrl" /> <br>
                {{ song.albam }}
              </v-flex>
            </v-layout>
          </div>
        </panel>
      </v-flex>

      <v-flex xs6 class="ml-1">
        <panel title="YouTube Video">
          <div slot="main">
            <v-layout>
              <v-flex xs6>
                <div class="song-youtubeId">
                  <youtube :video-id="song.youtubeId" :player-width="600" :player-height="240" />
                </div>
              </v-flex>
            </v-layout>
          </div>
        </panel>
      </v-flex>
    </v-layout>

    <v-layout class="mt-2">
       <v-flex xs6 class="mr-1">
        <panel title="Tabs">
          <div slot="main">
            <textarea label="Tab" readonly v-model="song.tab" class="textarea"></textarea>
          </div>
        </panel>
      </v-flex>

      <v-flex xs6 class="ml-1">
        <panel title="Lyrics">
          <div slot="main">
            <textarea label="Lyrics" readonly v-model="song.lyrics" class="textarea"></textarea>
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import VueYouTubeEmbed from 'vue-youtube-embed'
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      song: {}
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  components: {
    Panel,
    VueYouTubeEmbed
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 25px;
}

.song-artist {
  font-size: 20px;
}

.song-genre {
  font-size: 16px;
}

.albam-iamge {
  width: 20%;
  margin: 0 auto;
}

textarea {
  width: 100%;
  font-size: 13px;
  font-family: monospace;
  border: none;
  height: 500px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
}
</style>
