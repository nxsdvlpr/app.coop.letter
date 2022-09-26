import { gql } from 'graphql-tag'

export const GET_PRODUCT = gql`
  query getProduct($id: SID!) {
    product(id: $id) {
      id
      title
      description
      price
      image
      isActive
    }
  }
`
