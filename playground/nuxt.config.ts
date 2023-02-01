export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtPocketbase: {
    url: '',
    loginRoute: '/auth/login'
  }
})
