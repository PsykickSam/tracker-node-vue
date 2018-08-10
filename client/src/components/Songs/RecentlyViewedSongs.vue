<template>
  <panel title="Recently Viewed Songs">
    <div slot="main">
      <template>
        <v-data-table :headers="headers" :items="songs" :pagination.sync="pagination">
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">
              {{props.item.title}}
            </td>
            <td class="text-xs-left">
              {{props.item.artist}}
            </td>
          </template>
        </v-data-table>
      </template>
    </div>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      pagination: {
        sortBy: 'updatedAt',
        descending: true
      },
      songs: []
    }
  },
  computed: {
    ...mapState([
      'isLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isLoggedIn) {
      this.songs = (await SongHistoryService.all()).data
    }
  }
}
</script>
<style scoped>

</style>
