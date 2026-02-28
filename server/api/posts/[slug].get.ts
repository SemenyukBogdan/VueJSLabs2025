const posts: Record<string, { slug: string; title: string; excerpt: string; date: string; body: string }> = {
  'nuxt-ssr': {
    slug: 'nuxt-ssr',
    title: 'Lorem ipsum dolor sit amet',
    excerpt: 'Consectetur adipiscing elit, sed do eiusmod tempor.',
    date: '2025-02-01',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  'nitro-api': {
    slug: 'nitro-api',
    title: 'Sed ut perspiciatis unde',
    excerpt: 'Omnis iste natus error sit voluptatem accusantium.',
    date: '2025-02-10',
    body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
  },
  'usefetch': {
    slug: 'usefetch',
    title: 'Nemo enim ipsam voluptatem',
    excerpt: 'Quia voluptas sit aspernatur aut odit aut fugit.',
    date: '2025-02-20',
    body: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  },
}

export default defineEventHandler((event) => {
  const slug = event.context.params?.slug
  if (!slug || !posts[slug]) {
    throw createError({ statusCode: 404, message: 'Post not found' })
  }
  return posts[slug]
})
