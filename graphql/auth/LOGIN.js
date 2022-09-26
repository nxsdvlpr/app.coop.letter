import { gql } from 'graphql-tag'

export const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`
