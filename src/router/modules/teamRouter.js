
import Layout from '@/layout'

const teamRouter = {
  path: '/TeamManager',
  component: Layout,
  redirect: '/TeamManager/list',
  name: 'Team',
  meta: {
    title: '团队管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'litTeam-config',
      component: () => import('@/views/teamConfig/littleTeam/index.vue'),
      name: 'limitConfig',
      meta: { title: '战队管理' }
    },
    {
      path: 'list',
      component: () => import('@/views/teamConfig/teamList/index.vue'),
      name: 'listConfig',
      meta: { title: '团队列表' }
    },
    {
      path: 'edit',
      component: () => import('@/views/teamConfig/teamEdit/index.vue'),
      name: 'battleEdit',
      meta: { title: '战队编辑' },
      hidden: true
    },
    {
      path: 'member-config',
      component: () => import('@/views/membersConfig/index.vue'),
      name: 'memberConfig',
      meta: { title: '成员管理' }
    }
  ]
}
export default teamRouter
