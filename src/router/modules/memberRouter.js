
import Layout from '@/layout'

const membersRouter = {
  path: '/member',
  component: Layout,
  redirect: '/member/member-config',
  name: 'Members',
  meta: {
    title: '团队管理',
    icon: 'table'
  },
  children: [
    {
      path: 'member-config',
      component: () => import('@/views/membersConfig/index.vue'),
      name: 'memberConfig',
      meta: { title: '成员管理' }
    }
  ]
}
export default membersRouter
