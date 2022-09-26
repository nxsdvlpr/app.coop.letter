import { gql } from 'graphql-tag'

export const UPDATE_OPTIONS = gql`
  mutation ($input: UpdateOptionInput!) {
    updateOptions(input: $input)
  }
`
