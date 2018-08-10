<template>
  <v-layout>
    <!-- Logged in -->
    <v-flex class="mr-1" xs6 v-if="isLoggedIn">
      <songs-bookmarks />
      <recently-viewed-songs class="mt-2" />
    </v-flex>
    <v-flex class="ml-1" xs6 v-if="isLoggedIn">
      <songs-search-panel />
      <songs-panel class="mt-2" />
    </v-flex>
    <!-- Not logged in -->
    <v-flex xs6 offset-xs3 v-if="!isLoggedIn">
      <songs-search-panel />
      <songs-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongsBookmarks from './SongsBookmarks'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import SongsSearchPanel from './SongsSearchPanel'

import SongsService from '@/services/SongsService'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      songs: null
    }
  },
  computed: {
    ...mapState([
      'isLoggedIn'
    ])
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
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
