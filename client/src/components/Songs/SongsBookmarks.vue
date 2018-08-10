<template>
  <panel title="Bookmarks">
    <div slot="main">
      <template>
        <v-data-table :headers="headers" :items="bookmarks" :pagination.sync="pagination">
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
import BookmarksService from '@/services/BookmarksService'

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
      bookmarks: []
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
      this.bookmarks = (await BookmarksService.index()).data
    }
  }
}
</script>
<style scoped>

</style>
