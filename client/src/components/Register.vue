<template>
  <div>
    <h1>Register</h1>

    <input v-model="email" type="email" name="email" placeholder="Enter Email"> <br>
    <input v-model="password" type="password" name="password" placeholder="Enter Password"> <br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  data () {
    return {
      email: 'Some',
      password: 'Value'
    }
  },
  methods: {
    async register () {
      const response = await AuthService.register({
        email: this.email,
        password: this.password
      })

      console.log(response.data)
    }
  }
}
</script>

<style scoped>
</style>
