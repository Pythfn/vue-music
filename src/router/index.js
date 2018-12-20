import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'

const SingerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Recommend'
    },
    {
      path: '/Recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    }
  ]
})
