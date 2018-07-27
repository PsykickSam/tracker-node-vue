<template>
  <v-layout>
    <v-flex xs4 offset-xs4>
      <panel title="Register">
        <div slot="main">
          <form name="tab-tracker-form" autocomplete="off">
            <v-text-field type="email" v-model="email" label="Email" required></v-text-field>
            <v-text-field type="password" v-model="password" autocomplete="new-password" label="Password" required></v-text-field>
            <div v-html="error" class="err" />
            <v-btn @click="register" class="light-blue accent-1 mb-3">Register</v-btn>
          </form>
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
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthService.register({
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
