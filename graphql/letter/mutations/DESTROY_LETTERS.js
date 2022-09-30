import { gql } from 'graphql-tag'

export const DESTROY_LETTERS = gql`
  mutation destroyLetters($ids: [SID!]!) {
    deleteManyLetters(ids: $ids) {
      deletedCount
    }
  }
`
