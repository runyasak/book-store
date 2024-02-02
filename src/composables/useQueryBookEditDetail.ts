import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

interface QueryBookEditDetail {
  books: {
    title: string
    authorId: number
    coverImageUrl: string
    rating: number
    description: string
    __typename: string
  }[]
}

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
