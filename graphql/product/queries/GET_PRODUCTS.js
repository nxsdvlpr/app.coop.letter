import { gql } from 'graphql-tag'

export const GET_PRODUCTS = gql`
  query getProducts(
    $paging: CursorPaging!
    $query: String
    $sorting: ProductSort!
  ) {
    products(
      paging: $paging
      filter: {
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
