import { usePosts } from './queries'

export function PostList({
  selectedId,
  onSelect,
}: {
  selectedId: number | null
  onSelect: (id: number) => void
}) {
  const { data, isPending, isError, isFetching } = usePosts()

  if (isPending) return <p>Loading...</p>
  if (isError) return <p className="error">Something went wrong</p>

  return (
    <>
      {/* isFetching is also true for background refreshes: the data stays visible */}
      <p className="hint">{isFetching ? 'Refreshing...' : 'Up to date'}</p>
      <ul className="list">
        {data.map((post) => (
          <li key={post.id}>
            <button
              className={post.id === selectedId ? 'active' : ''}
              onClick={() => onSelect(post.id)}
            >
              {post.title}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
