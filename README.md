# TanStack Query demo

A small app that shows the main ideas from the TanStack Query slides. It uses a fake in-memory API (with a delay), so it works offline.

| Idea | Where |
| :--- | :--- |
| `QueryClientProvider`, `staleTime`, devtools | `src/main.tsx` |
| `useQuery`, query keys, `enabled`, custom hooks | `src/queries.ts` |
| `isPending`, `isError`, `isFetching` | `src/PostList.tsx`, `src/PostDetail.tsx` |
| `useMutation` and `invalidateQueries` | `src/AddPost.tsx` |
| Retries | the buttons at the bottom of the page (`src/api.ts` fails on demand) |

```bash
npm install
npm run dev
```

Open the devtools (bottom-right flower icon) to see the queries, their status, and the cache.
