import Home from './views/Home.vue'
// import Test from './views/Test.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home }, 
  { path: '/:path(.*)', component: Home },
]
