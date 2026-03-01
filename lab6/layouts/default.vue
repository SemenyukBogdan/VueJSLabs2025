<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <UContainer class="py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-semibold">Nuxt Course Blog</NuxtLink>
        <nav class="flex gap-4">
          <NuxtLink to="/">Головна</NuxtLink>
          <NuxtLink to="/blog">Блог</NuxtLink>
          <NuxtLink to="/about">Про курс</NuxtLink>
        </nav>
      </UContainer>
    </header>
    <main class="flex-1 py-8">
      <UContainer>
        <slot />
      </UContainer>
    </main>
    <footer class="border-t py-4 mt-auto">
      <UContainer class="text-center text-sm text-gray-500">
        Nuxt Course Blog &copy; 2025
      </UContainer>
    </footer>
  </div>
</template>
