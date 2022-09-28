import { gql } from 'graphql-tag'

export const BUILD_LETTER_REF = gql`
  query buildLetterRef($input: BuildLetterRefInput!) {
    buildLetterRef(input: $input)
  }
`
