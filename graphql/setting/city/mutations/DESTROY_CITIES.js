import { gql } from 'graphql-tag'

export const DESTROY_CITIES = gql`
  mutation destroyCities($ids: [SID!]!) {
    deleteManyCities(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
