
import Layout from '@/layout'

const channelRouter = {
  path: '/channelManager',
  component: Layout,
  redirect: '/channelManager/channel-table',
  name: 'Table',
  meta: {
    title: '推广管理',
    icon: 'table'
  },
  children: [
    {
      path: 'channel-table',
      component: () => import('@/views/resourceConfig/channelCon/index.vue'),
      name: 'resouerceCon',
      meta: { title: '渠道列表' }
    },
    {
      path: 'resouerceCon-table',
      component: () => import('@/views/resourceConfig/resouerceCon/index.vue'),
      name: 'channelCon',
      meta: { title: '资源管理' }
    },
    {
      path: 'awantCon-table',
      component: () => import('@/views/resourceConfig/awantCon/index.vue'),
      name: 'awantCon',
      meta: { title: '活动管理' }
    }
  ]
}
export default channelRouter
