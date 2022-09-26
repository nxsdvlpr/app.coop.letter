import { gql } from 'graphql-tag'

export const GET_TAGS = gql`
  query getTags($paging: CursorPaging!, $query: String, $sorting: TagSort!) {
    tags(
      paging: $paging
      filter: { or: [{ label: { iLike: $query } }] }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          slug
          label
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
