import { gql } from 'graphql-tag'

export const UPDATE_LETTER = gql`
  mutation updateLetter($input: UpdateLetterInput!) {
    updateLetter(input: $input) {
      id
    }
  }
`
