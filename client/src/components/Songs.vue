<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <panel title="Songs">
        <v-btn @click="navigateTo({name: 'create-new-song'})" slot="action" class="light-blue darken-1" dark medium absolute right middle fab>
          <v-icon>add</v-icon>
        </v-btn>

        <div slot="main">
          <div v-for="song in songs" :key="song.id" class="song">
            <v-layout>
              <v-flex xs6>
                <div class="song-title">
                  {{ song.title }}
                </div>
                <div class="song-artist">
                  {{ song.artist }}
                </div>
                <div class="song-genre">
                  {{ song.albam }}
                </div>
                <v-btn @click="navigateTo({name: 'view-song', params: {songId: song.id}})" class="light-blue accent-1 mt-2">View Song</v-btn>
              </v-flex>

              <v-flex xs6>
                <img class="albam-image" :src="song.albamImageUrl" />
              </v-flex>
            </v-layout>
          </div>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  components: {
    Panel
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
  width: 50%;
  margin: 0 auto;
}
</style>
