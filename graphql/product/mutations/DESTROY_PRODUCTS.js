import { gql } from 'graphql-tag'

export const DESTROY_PRODUCTS = gql`
  mutation destroyProducts($ids: [SID!]!) {
    deleteManyProducts(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
