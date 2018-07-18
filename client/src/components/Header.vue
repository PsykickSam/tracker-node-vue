<template>
  <v-toolbar fixed class="light-blue accent-1">
    <v-toolbar-title class="mr-4">
        <span class="root" @click="navigateTo({name: 'root'})">Tab Tracker</span>
    </v-toolbar-title>

    <v-toolbar-items><v-btn v-if="$store.state.isLoggedIn" flat>Browse</v-btn></v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items><v-btn v-if="!$store.state.isLoggedIn" flat @click="navigateTo({name: 'login'})">Login</v-btn></v-toolbar-items>
    <v-toolbar-items><v-btn v-if="!$store.state.isLoggedIn" flat @click="navigateTo({name: 'register'})">Register</v-btn></v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
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
