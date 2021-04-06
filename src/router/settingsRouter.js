import Layout from '@/layout'

const SettingsRouter = {
  path: '/settings',
  name: 'Settings',
  component: Layout,
  redirect: 'noredirect',
  meta: { title: 'Settings', icon: 'tree' },
  children: [
    {
      path: 'user',
      name: 'UserManagement',
      component: () => import('@/views/settings/user-management/index'),
      meta: { title: 'User Management', icon: 'example' }
    },
    {
      path: 'role',
      name: 'RoleManagement',
      component: () => import('@/views/settings/role-management/index'),
      meta: { title: 'Role Management', icon: 'form' }
    }
  ]
}

export default SettingsRouter
