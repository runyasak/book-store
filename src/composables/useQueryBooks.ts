import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

interface QueryBooks {
  books: {
    __typename: string
    bookId: number
    title: string
    coverImageUrl: string
    publishedDate: string
    author: {
      __typename: string
      name: string
    }
  }[]
}

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
