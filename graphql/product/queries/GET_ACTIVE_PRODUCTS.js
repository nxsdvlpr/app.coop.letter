import { gql } from 'graphql-tag'

export const GET_ACTIVE_PRODUCTS = gql`
  query getActiveProducts(
    $paging: CursorPaging!
    $query: String
    $sorting: ProductSort!
  ) {
    products(
      paging: $paging
      filter: {
        isActive: { is: true }
        or: [{ title: { iLike: $query } }, { description: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          title
          description
          price
          image
          isActive
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
