import Api from '@/services/Api'

export default {
  all () {
    return Api().get('all/bookmarks')
  },
  index (bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  add (bookmark) {
    return Api().post('bookmarks', {
      params: bookmark
    })
  },
  remove (id) {
    return Api().delete(`bookmarks/${id}`)
  }
}
