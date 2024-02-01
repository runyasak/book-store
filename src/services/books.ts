import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

interface QueryBooks {
  books: {
    bookId: number
    title: string
    coverImageUrl: string
    publishedDate: string
    author: {
      name: string
    }
  }[]
}

export const useQueryBooks = useQuery<QueryBooks>(gql`
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
