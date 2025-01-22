import { Navigate, useRoutes } from 'react-router'

import { useAuth } from './context/auth/authContext'
import PageNotFound from './features/404'
import Login from './features/authentication/login'
import Kanban from './features/kanban'
import CreateKanban from './features/kanban/create'
import DetailKanban from './features/kanban/detail'
import EditKanban from './features/kanban/edit'
import Layout from './features/layout'

export default function RoutesApp() {
  const { state: authState } = useAuth()

  const privateRoutes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Kanban />
        },
        {
          path: '/create',
          element: <CreateKanban />
        },
        {
          path: '/detail/:id',
          element: <DetailKanban />
        },
        {
          path: '/edit/:id',
          element: <EditKanban />
        },
        { path: '*', element: <PageNotFound /> }
      ]
    }
  ]

  const publicRoutes = [
    {
      path: '/',
      element: <Login />
    },
    { path: '*', element: <Navigate to='/' replace /> }
  ]

  return useRoutes(authState.isAuthenticated ? privateRoutes : publicRoutes)
}
