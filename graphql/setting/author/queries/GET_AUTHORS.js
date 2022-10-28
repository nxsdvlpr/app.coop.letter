import { gql } from 'graphql-tag'

export const GET_AUTHORS = gql`
  query getAuthors(
    $paging: CursorPaging!
    $query: String
    $sorting: AuthorSort!
  ) {
    authors(
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
