import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from './api'

export function AddPost() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()

  const addPost = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // The list is now out of date: mark it as stale and refetch it
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitle('')
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (title.trim()) addPost.mutate(title)
      }}
    >
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New post title" />
      <button disabled={addPost.isPending}>{addPost.isPending ? 'Adding...' : 'Add post'}</button>
      {addPost.isError && <span className="error"> Could not add the post</span>}
    </form>
  )
}
