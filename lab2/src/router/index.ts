import { createRouter, createWebHistory } from 'vue-router'
import { isAuthed } from "@/services/AuthModule.ts"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
        name: "home",
      component: () => import("../views/Home.vue"),
      meta: { public: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: { public: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: { public: true },
    },

    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminLayout.vue"),
      meta: { requiresAuth: true },
      redirect: "/admin/dashboard",
      children: [
        {
          path: "dashboard",
          name: "admin-dashboard",
          component: () => import("../views/admin/Dashboard.vue"), // lazy-loaded
          meta: { requiresAuth: true },
        },
        {
          path: "users",
          name: "admin-users",
          component: () => import("../views/admin/Users.vue"), // lazy-loaded
          meta: { requiresAuth: true },
        },
        {
          path: "user/:id",
          name: "admin-user",
          component: () => import("../views/admin/UserDetails.vue"), // lazy-loaded
          meta: { requiresAuth: true },
          props: true,
        },
        {
          path: "reports",
          name: "admin-reports",
          component: () => import("../views/admin/Reports.vue"), // lazy-loaded
          meta: { requiresAuth: true },
        },
      ],
    },

    // catch-all
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFound.vue"),
    },
  ],

  scrollBehavior() {
    return { top: 0 };
  },

  linkActiveClass: "active-link",
});




router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthed()) {
    return { name: "login", query: { redirect: to.fullPath } }
  }
})


export default router;
