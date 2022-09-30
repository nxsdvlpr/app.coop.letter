import { gql } from 'graphql-tag'

export const DESTROY_COMPANIES = gql`
  mutation destroyCompanies($ids: [SID!]!) {
    deleteManyCompanies(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
