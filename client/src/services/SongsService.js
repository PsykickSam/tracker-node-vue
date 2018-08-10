import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('songs', {
      params: {
        search: search
      }
    })
  },
  show (songId) {
    return Api().get(`songs/${songId}`)
  },
  create (song) {
    return Api().post('songs', song)
  },
  update (song, songId) {
    return Api().put(`songs/${songId}`, song)
  }
}
