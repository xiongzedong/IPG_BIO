import { lazy, Suspense } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Spin } from 'antd';
// 懒加载页面组件
const Home = lazy(() => import('./home/index'))
const BusinessSegments = lazy(() => import('./businessSegments/index'))
const Contact = lazy(() => import('./contact/index'))

// 公共加载占位组件
const lazyWrap = (Element) => (
  <Suspense fallback={<Spin />}>
    <Element />
  </Suspense>
)

const routes = [
  // 根路径重定向到 /home
  {
    path: '/',
    element: <Navigate to="/home" replace />
  },
  {
    path: 'home',
    element: lazyWrap(Home)
  },
  {
    path: 'business-segments',
    element: lazyWrap(BusinessSegments)
  },
  {
    path: 'contact',
    element: lazyWrap(Contact)
  }
]

export const router = createBrowserRouter(routes)
export default routes