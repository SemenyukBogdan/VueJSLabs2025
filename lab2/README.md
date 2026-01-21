
## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```


короткий опис де застосовані
props/emits,

Props застосовані в компоненті Login.vue
```
      <BaseInput v-model="form.email" label="Email" :error="errors.email"/>
      <BaseInput v-model="form.password" label="Password" type="password" :error="errors.password"/>

```
Через директиву v-model в дочірній компонент передається змінна form.email

Emits застосовані в компоненті baseInput.vue:
```
const emit = defineEmits<{ (e: "update:modelValue", v: string): void }>()
```
Визначаю подію на переменну emit.

v-model/defineModel,

provide/inject,
Використано provide в компоненті App.vue
```
provide("isAuthKey", isAuth)
```

Використано inject в Login.vue 
```
const isAuth = inject("isAuthKey") as Ref<boolean>
```


слоти використані в компоненті ReportsTable
```
<template>
  <table>
    <tbody>
    <tr v-for="item in items" :key="item.id">
      <slot name="row" :item="item">

      </slot>
    </tr>
    </tbody>
  </table>
</template>
```

Використано KeepAlive в '@/views/admin/Dashboard'
```
<template>
  <div class="demo">
    <label><input type="radio" v-model="current" :value="CompA" /> A</label>
    <label><input type="radio" v-model="current" :value="CompB" /> B</label>
    <KeepAlive include="CompA" exclude="CompB" :max="2">
      <component :is="current"></component>
    </KeepAlive>
  </div>
</template>
```



Виконано роутинг (default + named toolbar, lazy-loading, guard’и).
в файлі '@/src/router/index.ts'
```
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
```
