<template>
  <div>
    <div class="white elevation-5">
      <v-toolbar class="light-blue accent-1" flat dense>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <slot name="action" />
      </v-toolbar>

      <div class="pl-4 pr-4 pt-2 pb-2">
        <slot name="main">
            No content defined
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
</style>
