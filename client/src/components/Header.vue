<template>
  <v-toolbar fixed class="light-blue accent-1">
    <v-toolbar-title class="mr-4">
        <router-link class="root" tag="span" :to="{ name: 'songs' }">Tab Tracker</router-link>
    </v-toolbar-title>

    <v-toolbar-items><v-btn flat :to="{name: 'songs'}">Browse</v-btn></v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items><v-btn v-if="!$store.state.isLoggedIn" flat :to="{name: 'login'}">Login</v-btn></v-toolbar-items>
    <v-toolbar-items><v-btn v-if="!$store.state.isLoggedIn" flat :to="{name: 'register'}">Register</v-btn></v-toolbar-items>
    <v-toolbar-items><v-btn v-if="$store.state.isLoggedIn" flat @click="logout">Logout</v-btn></v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setIsLoggedIn', false)
      // Redirect to home
      this.$router.push({name: 'songs'})
    }
  }
}
</script>

<style scoped>
.root {
  cursor: pointer;
}

.root:hover {
  color: gray;
}
</style>
