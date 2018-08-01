import Api from '@/services/Api'

export default {
  index () {
    return Api().get('songs')
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
