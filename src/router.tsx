import { Navigate, useRoutes } from 'react-router'

import { useAuth } from './context/auth/authContext'
import PageNotFound from './features/404'
import Login from './features/authentication/login'
import Kanban from './features/kanban'
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
