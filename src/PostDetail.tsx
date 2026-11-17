import { usePost } from './queries'

export function PostDetail({ id }: { id: number | null }) {
  const { data, isPending, isError } = usePost(id)

  if (id === null) return <p>Select a post.</p>
  if (isPending) return <p>Loading...</p>
  if (isError) return <p className="error">Something went wrong</p>

  return (
    <>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </>
  )
}
