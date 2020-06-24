import Layout from '@/layout'

const SettingsRouter = {
  path: '/milestone',
  name: 'Milestone',
  component: Layout,
  redirect: 'noredirect',
  meta: { title: 'Milestone', icon: 'link' },
  children: [
    {
      path: 'report',
      name: 'MilestoneReport',
      component: () => import('@/views/milestone/report/index'),
      meta: { title: 'Report', icon: 'nested' }
    },
    {
      path: 'headcount-plan',
      name: 'HeadcountPlan',
      component: () => import('@/views/milestone/report/index'),
      meta: { title: 'Headcount Plan', icon: 'password' }
    }
  ]
}

export default SettingsRouter
