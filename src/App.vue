<template>
  <header-view v-if="this.$route.path !== '/'"></header-view>
  <router-view></router-view>
</template>

<script>
import HeaderView from '@/layout/header';
export default {
  name: 'App',
  components: { HeaderView }
}
</script>

<style>
#app {
  font-family: 'Inter', sans-serif;
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
