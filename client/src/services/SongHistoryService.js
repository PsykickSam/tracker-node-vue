import Api from '@/services/Api'

export default {
  all () {
    return Api().get('history')
  },
  add (history) {
    return Api().post('history', history)
  }
}
