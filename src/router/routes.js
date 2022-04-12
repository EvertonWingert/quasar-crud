const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: 'Home'
        },
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'posts',
        name: 'posts.index',
        meta: {
          title: 'Lista de posts'
        },
        component: () => import('pages/post/PostIndex.vue')
      },
      {
        path: 'posts/create',
        name: 'posts.create',
        meta: {
          title: 'Criar post'
        },
        component: () => import('pages/post/PostCreate.vue')
      },
      {
        path: 'posts/:id/edit',
        name: 'posts.edit',
        meta: {
          title: 'Editar post'
        },
        component: () => import('pages/post/PostCreate.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
