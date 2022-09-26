import { gql } from 'graphql-tag'

export const GET_USERS = gql`
  query getUsers($paging: CursorPaging!, $query: String, $sorting: UserSort!) {
    users(
      paging: $paging
      filter: {
        or: [{ name: { iLike: $query } }, { username: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          name
          username
          phone
          role {
            id
            name
            shortname
          }
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
