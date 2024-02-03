import type {
  MuationUpdateBookResponse,
  MutationUpdateBookVariable
} from '@/models/book.model'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default function () {
  return useMutation<MuationUpdateBookResponse, MutationUpdateBookVariable>(gql`
    mutation UpdateBook($bookId: Int!, $requestBookInput: RequestBookInput) {
      updateBook(id: $bookId, bookRequest: $requestBookInput) {
        bookId
      }
    }
  `)
}
