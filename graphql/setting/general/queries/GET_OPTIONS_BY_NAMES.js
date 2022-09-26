import { gql } from 'graphql-tag'

export const GET_OPTIONS_BY_NAMES = gql`
  query getOptionsByNames($paging: CursorPaging, $names: [String!]) {
    options(
      paging: $paging
      sorting: [{ field: id, direction: ASC }]
      filter: { name: { in: $names } }
    ) {
      edges {
        node {
          id
          name
          label
          value
          type
        }
      }
    }
  }
`
