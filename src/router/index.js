import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes} from './routes'
import { changeTitle } from '@/util'

// Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.afterEach(route => {
  changeTitle(route.meta.title)
})

export default router
