import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

interface QueryBooksPagination {
  booksPagination: {
    nodes: {
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
    pageInfo: {
      __typename: string
      startCursor: string
      endCursor: string
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }
}

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
