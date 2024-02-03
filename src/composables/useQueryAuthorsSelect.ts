import type { AuthorsSelect } from '@/models/author.model'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

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
