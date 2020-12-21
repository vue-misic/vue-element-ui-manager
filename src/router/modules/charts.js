
import Layout from '@/layout'

const chartsRouter = {
  path: '/dataChart',
  component: Layout,
  redirect: '/dataChart/battle',
  name: 'Charts',
  meta: {
    title: '数据报表',
    icon: 'chart'
  },
  children: [
    {
      path: 'battle',
      component: () => import('@/views/charts/battle'),
      name: 'LineChart',
      meta: { title: '战队报表', noCache: true }
    },
    {
      path: 'team',
      component: () => import('@/views/charts/team'),
      name: 'MixChart',
      meta: { title: '团队报表', noCache: true }
    }
  ]
}

export default chartsRouter
