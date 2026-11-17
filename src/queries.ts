import { useQuery } from '@tanstack/react-query'
import { fetchPost, fetchPosts } from './api'

// Custom hooks: components say what they need, key and fetcher live here
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
}

export function usePost(id: number | null) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id!),
    enabled: id !== null, // do not fetch until a post is selected
  })
}
