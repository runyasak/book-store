import type { QueryBooksPagination } from '@/models/book.model'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default function () {
  return useQuery<QueryBooksPagination, { after?: string }>(gql`
    query BooksPagination($after: String) {
      booksPagination(first: 10, after: $after) {
        nodes {
          bookId
          title
          coverImageUrl
          publishedDate
          author {
            name
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `)
}
