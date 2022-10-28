import { gql } from 'graphql-tag'

export const GET_CITIES = gql`
  query getCities($paging: CursorPaging!, $query: String, $sorting: CitySort!) {
    cities(
      paging: $paging
      filter: { or: [{ name: { iLike: $query } }] }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          name
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
