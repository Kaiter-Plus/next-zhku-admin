import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 登录界面
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // 404 界面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
      }
    ]
  },

  // 图片管理
  {
    path: '/image',
    component: Layout,
    redirect: '/image/banner',
    name: 'Image',
    meta: { title: '图片管理', icon: 'el-icon-picture' },
    children: [
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/image/banner'),
        meta: { title: 'Banner' }
      },
      {
        path: 'carousel',
        name: 'Carousel',
        component: () => import('@/views/image/carousel'),
        meta: { title: '轮播图' }
      }
    ]
  },

  // 学校概况管理
  {
    path: '/school-profile',
    component: Layout,
    redirect: '/school-profile/school-introduce',
    name: 'SchoolProfile',
    meta: { title: '学校概况管理', icon: 'example' },
    children: [
      {
        path: 'school-introduce',
        name: 'SchoolIntroduce',
        component: () => import('@/views/school-profile/school-introduce'),
        meta: { title: '学校介绍' }
      },
      {
        path: 'incumbent',
        name: 'Incumbent',
        component: () => import('@/views/school-profile/incumbent'),
        meta: { title: '现任领导' }
      },
      {
        path: 'leader-care',
        name: 'LeaderCare',
        component: () => import('@/views/school-profile/leader-care'),
        meta: { title: '领导关怀' }
      },
      {
        path: 'school-scenery',
        name: 'SchoolScenery',
        component: () => import('@/views/school-profile/school-scenery'),
        meta: { title: '校园风光' }
      },
      {
        path: 'school-constitution',
        name: 'SchoolConstitution',
        component: () => import('@/views/school-profile/school-constitution'),
        meta: { title: '学校章程' }
      }
    ]
  },

  // 新闻管理
  {
    path: '/news',
    component: Layout,
    redirect: '/news/categories',
    name: 'News',
    meta: {
      title: '新闻管理',
      icon: 'form'
    },
    children: [
      {
        path: 'categories',
        name: 'NewsCategories',
        component: () => import('@/views/news/categories'),
        meta: { title: '新闻类别' }
      },
      {
        path: 'create',
        component: () => import('@/views/news/create'),
        hidden: true,
        name: 'CreateNews',
        meta: { title: '新建新闻' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/news/edit'),
        name: 'EditNews',
        meta: { title: '编辑新闻', noCache: true, activeMenu: '/news/news-list' },
        hidden: true
      },
      {
        path: 'news-list',
        component: () => import('@/views/news/list/index'),
        name: 'NewsList',
        meta: { title: '新闻列表' }
      }
    ]
  },

  // 专题管理
  {
    path: '/special',
    component: Layout,
    redirect: '/special/categories',
    name: 'Special',
    meta: {
      title: '专题管理',
      icon: 'el-icon-s-flag'
    },
    children: [
      {
        path: 'categories',
        name: 'SpecialCategories',
        component: () => import('@/views/special/categories'),
        meta: { title: '专题类别' }
      },
      {
        path: 'create',
        component: () => import('@/views/special/create'),
        hidden: true,
        name: 'CreateSpecial',
        meta: { title: '新建专题' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/special/edit'),
        name: 'EditSpecial',
        meta: { title: '编辑专题', noCache: true, activeMenu: '/special/news-list' },
        hidden: true
      },
      {
        path: 'special-list',
        component: () => import('@/views/special/list/index'),
        name: 'SpecialList',
        meta: { title: '专题项列表' }
      }
    ]
  },

  // 链接管理
  {
    path: '/links',
    component: Layout,
    redirect: '/links/categories',
    name: 'Links',
    meta: { title: '链接管理', icon: 'el-icon-link' },
    children: [
      {
        path: 'categories',
        name: 'LinksCategories',
        component: () => import('@/views/links/categories'),
        meta: { title: '链接类别' }
      },
      {
        path: 'link-list',
        name: 'LinkList',
        component: () => import('@/views/links/list/index'),
        meta: { title: '链接项列表' }
      }
    ]
  },

  // 页脚管理
  {
    path: '/footer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Footer',
        component: () => import('@/views/footer/index'),
        meta: { title: '页脚管理', icon: 'tree' }
      }
    ]
  },

  // 去官网
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://baidu.com',
        meta: { title: '去官网', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
