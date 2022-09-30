import { gql } from 'graphql-tag'

export const GET_COMPANIES = gql`
  query getCompanies(
    $paging: CursorPaging!
    $query: String
    $sorting: CompanySort!
  ) {
    companies(
      paging: $paging
      filter: { or: [{ name: { iLike: $query } }] }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          name
          code
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
