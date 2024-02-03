import type { QueryBookEditDetail } from '@/models/book.model'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default function (bookId: number) {
  return useQuery<QueryBookEditDetail>(
    gql`
      query BookEditDetail($bookId: Int) {
        books(where: { bookId: { eq: $bookId } }) {
          title
          authorId
          coverImageUrl
          rating
          description
        }
      }
    `,
    { bookId: bookId }
  )
}
