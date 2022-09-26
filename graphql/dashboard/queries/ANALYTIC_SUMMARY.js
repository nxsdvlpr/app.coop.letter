import { gql } from 'graphql-tag'

export const ANALYTIC_SUMMARY = gql`
  query analyticSummary($names: [String!]!) {
    analyticSummary(names: $names) {
      id
      updatedAt
      name
      value
    }
  }
`
