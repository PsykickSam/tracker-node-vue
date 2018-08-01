<template>
  <div>
    <v-layout>
      <v-flex xs4 class="mr-1">
        <panel title="Song Metadata">
          <div slot="main">
            <v-text-field label="Title" v-model="song.title" required :rules=[required]></v-text-field>
            <v-text-field label="Artist" v-model="song.artist" required :rules=[required]></v-text-field>
            <v-text-field label="Genre" v-model="song.genre" required :rules=[required]></v-text-field>
            <v-text-field label="Albam" v-model="song.albam" required :rules=[required]></v-text-field>
            <v-text-field label="Albam Image Url" v-model="song.albamImageUrl" required :rules=[required]></v-text-field>
            <v-text-field label="Youtube Id" v-model="song.youtubeId" required :rules=[required]></v-text-field>
          </div>
        </panel>
      </v-flex>

      <v-flex xs8 class="ml-1">
        <panel title="Song Structure">
          <div slot="main">
            <v-textarea label="Tab" v-model="song.tab" required :rules=[required]></v-textarea>
            <v-textarea label="Lyrics" v-model="song.lyrics" required :rules=[required]></v-textarea>
          </div>
        </panel>

        <div class="merror mt-4" v-if="error">{{ error }}</div>
        <v-btn @click="update" large block class="light-blue accent-1 mt-2">Update Song</v-btn>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {},
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    async update () {
      const areAllFieldsFilled = Object.keys(this.song).every(key => !!this.song[key])

      if (!areAllFieldsFilled) {
        this.error = 'Please fill all the fields.'
        return
      }

      try {
        const songId = this.$store.state.route.params.songId
        await SongsService.update(this.song, songId)
        this.$router.push({name: 'view-song', params: {songId: songId}})
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.merror {
  color: red;
  background: white;
}
</style>
