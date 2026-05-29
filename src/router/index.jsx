import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import CariRuanganPage from '../pages/CariRuanganPage'
import DetailRuanganPage from '../pages/DetailRuanganPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/cari-ruangan" replace />,
      },
      {
        path: 'cari-ruangan',
        element: <CariRuanganPage />,
      },
      {
        path: 'ruangan/:id',
        element: <DetailRuanganPage />,
      },
    ],
  },
])
