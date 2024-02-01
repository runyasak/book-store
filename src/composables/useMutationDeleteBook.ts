import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

interface MutationDeleteBookResult {
  id: string
  timestamp: number
  matcher: {
    static: unknown
    wildcard: unknown
    dynamic: unknown
  }
  prerendered: unknown[]
}

interface MutationDeleteBook {
  bookId: number
}

export default function () {
  return useMutation<MutationDeleteBookResult, MutationDeleteBook>(gql`
    mutation DeleteBookByBookId($bookId: Int!) {
      deleteBook(id: $bookId)
    }
  `)
}
