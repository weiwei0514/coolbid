import Ahomepage from './components/Ahomepage/aHomepage'
import Category from './components/Ahomepage/CatProduct/category'
const routes = [
  {
    path: '/Ahomepage',
    component: Ahomepage,
    exact: true,
    breadcrumb: '競標區',
    routes: [
      {
        path: '/Ahomepage/bag',
        component: Category,
        breadcrumbName: '包包類'
      }
    ]
  }
]

export default routes
