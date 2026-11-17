export type Post = { id: number; title: string; body: string }

// A fake server, kept in memory, so the demo works offline
let posts: Post[] = [
  { id: 1, title: 'My first post', body: 'Hello from the first post!' },
  { id: 2, title: 'Queries and keys', body: 'The key identifies the data in the cache.' },
  { id: 3, title: 'Stale data', body: 'Stale data is shown first, then refetched.' },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Lets the demo show retries: the next `n` requests fail
let failures = 0
export function failNext(n: number) {
  failures = n
}

async function request<T>(name: string, work: () => T): Promise<T> {
  console.log('request:', name)
  await delay(800)
  if (failures > 0) {
    failures--
    // fetch does not throw on 500 either, so a real queryFn throws like this
    throw new Error(`${name} failed`)
  }
  return work()
}

export const fetchPosts = () => request('fetchPosts', () => [...posts])

export const fetchPost = (id: number) =>
  request('fetchPost', () => {
    const post = posts.find((p) => p.id === id)
    if (!post) throw new Error('Post not found')
    return post
  })

export const createPost = (title: string) =>
  request('createPost', () => {
    const post = { id: posts.length + 1, title, body: 'A brand new post.' }
    posts = [...posts, post]
    return post
  })
