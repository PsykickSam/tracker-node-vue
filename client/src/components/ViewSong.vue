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
                <v-btn :to="{name: 'edit-song', params () { return { songId: song.id } }}" class="light-blue accent-1 mt-2">Edit</v-btn>
                <br>
                <v-btn v-if="$store.state.isLoggedIn && !bookmark" @click="setBookmark" class="light-blue accent-1 mt-2">Set Bookmark</v-btn>
                <v-btn v-if="$store.state.isLoggedIn && bookmark" @click="unsetBookmark" class="light-blue accent-1 mt-2">Unset Bookmark</v-btn>
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
                  <div>
                    <youtube :video-id="song.youtubeId" :player-width="400" :player-height="240" />
                  </div>
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
import BookmarksService from '@/services/BookmarksService'
import SongHistoryService from '@/services/SongHistoryService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      song: {},
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isLoggedIn',
      'user',
      'route'
    ])
  },
  methods: {
    async setBookmark () {
      try {
        this.bookmark = (await BookmarksService.add({
          songId: this.song.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetBookmark () {
      try {
        await BookmarksService.remove(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  },
  watch: {
    async song () {
      if (this.isLoggedIn) {
        try {
          const bookmarks = (await BookmarksService.index({
            songId: this.song.id
          })).data

          if (bookmarks.length) {
            this.bookmark = bookmarks[0]
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  async mounted () {
    const songId = this.route.params.songId
    this.song = (await SongsService.show(songId)).data

    if (this.isLoggedIn) {
      SongHistoryService.add({
        songId: songId
      })
    }
  },
  components: {
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

.song-youtubeId div {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

textarea {
  width: 100%;
  font-size: 12px;
  font-family: monospace;
  border: none;
  height: 500px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
}
</style>
