import { gql } from 'graphql-tag'

export const GET_OPTIONS = gql`
  query getOptions($paging: CursorPaging!) {
    options(paging: $paging, sorting: [{ field: id, direction: ASC }]) {
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
