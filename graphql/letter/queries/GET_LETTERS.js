import { gql } from 'graphql-tag'

export const GET_LETTERS = gql`
  query getLetters(
    $paging: CursorPaging!
    $query: String
    $sorting: LetterSort!
  ) {
    letters(
      paging: $paging
      filter: {
        or: [{ ref: { iLike: $query } }, { subject: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          ref
          publishedDate
          to
          subject
          attachment
          category
          user {
            id
            name
            username
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
