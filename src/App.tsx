import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { failNext } from './api'
import { AddPost } from './AddPost'
import { PostDetail } from './PostDetail'
import { PostList } from './PostList'

export function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const queryClient = useQueryClient()

  return (
    <main>
      <h1>TanStack Query demo</h1>

      <div className="split">
        <section>
          <h2>Posts</h2>
          <PostList selectedId={selectedId} onSelect={setSelectedId} />
          <AddPost />
        </section>
        <section>
          <PostDetail id={selectedId} />
        </section>
      </div>

      <section className="tools">
        <h3>Try it</h3>
        <button
          onClick={() => {
            // Retries: the first two attempts fail, the third works
            failNext(2)
            queryClient.invalidateQueries({ queryKey: ['posts'] })
          }}
        >
          Refetch, but fail twice (watch the retries)
        </button>
        <button
          onClick={() => {
            // Retries: all attempts fail, so the query ends in an error
            failNext(99)
            queryClient.invalidateQueries({ queryKey: ['posts'] })
          }}
        >
          Refetch, but fail every time
        </button>
        <button onClick={() => failNext(0)}>Stop failing</button>
      </section>
    </main>
  )
}
