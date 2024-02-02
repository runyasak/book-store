import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

interface MuationUpdateBookResponse {
  data: {
    updateBook: {
      bookId: number
      __typename: string
    }
  }
}

interface MutationUpdateBookVariable {
  bookId: number
  requestBookInput: {
    title: string
    authorId: number
    coverImageUrl: string
    rating: number
    description: string
  }
}

export default function () {
  return useMutation<MuationUpdateBookResponse, MutationUpdateBookVariable>(gql`
    mutation UpdateBook($bookId: Int!, $requestBookInput: RequestBookInput) {
      updateBook(id: $bookId, bookRequest: $requestBookInput) {
        bookId
      }
    }
  `)
}
