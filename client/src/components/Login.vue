<template>
  <v-layout>
    <v-flex xs4 offset-xs4>
      <panel title="Login">
        <div slot="main">
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field type="password" v-model="password" label="Password" required></v-text-field>
          <div v-html="error" class="err" />
          <v-btn @click="login" class="light-blue accent-1 mb-3">Login</v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthService from '@/services/AuthService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      email: 'sadman@gmail.com',
      password: '123123',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        })
        this.error = null
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setIsLoggedIn', true)
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.err {
  color: red;
}
</style>
