import React, { FC } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout/Layout';
import { useAuth } from '../components/Providers/useAuth';
import Auth from '../pages/Auth/Auth';
import { routes } from './list'

const AppRoutes: FC = () => {
  const { user } = useAuth()

  return (
    <Router>
      <Layout>
        <Routes>
          {user ? (
            routes.map(route => (
              <Route
                key={`route ${route.path}`}
                path={route.path}
                element={<route.component />}
              />
            ))
          ) : (
            <Route path="*" element={<Auth />} />
          )}
        </Routes>
      </Layout>
    </Router>
  )
}

export default AppRoutes
