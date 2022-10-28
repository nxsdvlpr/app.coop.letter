import { gql } from 'graphql-tag'

export const CREATE_AUTHOR = gql`
  mutation createAuthor($input: CreateAuthorInput!) {
    createAuthor(input: $input) {
      id
    }
  }
`
