import { useRoutes } from 'react-router-dom'
import { Suspense } from 'react'
import routes from './app/page/Router'

function App() {
  // 根据路由配置生成路由节点
  const routeElement = useRoutes(routes)

  return (
    // 懒加载loading占位
    <Suspense fallback={<div>页面加载中...</div>}>
      {routeElement}
    </Suspense>
  )
}

export default App;
