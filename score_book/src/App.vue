<template>
  <div id="app">
    <game-dashboard></game-dashboard>
  </div>
</template>

<script>
import GameDashboard from './components/GameDashboard.vue'

export default {
  name: 'App',
  components: {
    GameDashboard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
