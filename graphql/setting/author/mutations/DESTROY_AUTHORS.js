import { gql } from 'graphql-tag'

export const DESTROY_AUTHORS = gql`
  mutation destroyAuthors($ids: [SID!]!) {
    deleteManyAuthors(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
