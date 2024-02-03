import type { QueryBooks } from '@/models/book.model'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default function () {
  return useQuery<QueryBooks>(gql`
    query Books {
      books {
        bookId
        title
        coverImageUrl
        publishedDate
        author {
          name
        }
      }
    }
  `)
}
