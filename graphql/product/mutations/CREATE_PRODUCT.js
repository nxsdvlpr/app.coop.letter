import { gql } from 'graphql-tag'

export const CREATE_PRODUCT = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`
