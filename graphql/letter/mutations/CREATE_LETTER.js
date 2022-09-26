import { gql } from 'graphql-tag'

export const CREATE_LETTER = gql`
  mutation createLetter($input: CreateLetterInput!) {
    createLetter(input: $input) {
      id
    }
  }
`
