import { gql } from 'graphql-tag'

export const DESTROY_LETTERS = gql`
  mutation destroyLetters($ids: [SID!]!) {
    deleteManyLetters(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
