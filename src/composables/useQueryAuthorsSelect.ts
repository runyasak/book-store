import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

interface AuthorsSelect {
  authors: {
    id: number
    name: string
  }[]
}

export default function () {
  return useQuery<AuthorsSelect>(gql`
    query AuthorsSelect {
      authors {
        id
        name
      }
    }
  `)
}
