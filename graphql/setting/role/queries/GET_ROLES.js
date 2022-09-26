import { gql } from 'graphql-tag'

export const GET_ROLES = gql`
  query getRoles($paging: CursorPaging!, $query: String, $sorting: RoleSort!) {
    roles(
      paging: $paging
      filter: {
        or: [{ name: { iLike: $query } }, { shortname: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          name
          shortname
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
